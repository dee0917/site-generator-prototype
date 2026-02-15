/**
 * 商品資料庫同步腳本 (Product Database Sync Script)
 *
 * 從 progress-report/index.html 中提取 SOURCING_RAW 商品數據，
 * 與本地 raw_products.json 做 hash 比對，僅在有實際變更時才覆寫。
 * 同時檢測新分類，自動追加到 categoryConfig.ts。
 *
 * 用法：
 *   npx tsx scripts/sync-products.ts         # 手動同步
 *   npm run sync                              # 透過 npm script
 *   npm run dev                               # 自動在 dev 前同步 (predev hook)
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { createHash } from 'crypto';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

// NOTE: __dirname 在 ESM 中不可用，需手動計算
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ===== 路徑配置 =====
const PATHS = {
    /** progress-report 的 index.html — 商品數據的唯一真實來源 */
    sourceHtml: resolve(__dirname, '../../projects/progress-report/index.html'),
    /** progress-report 側的 extracted JSON（保持向後相容） */
    sourceJson: resolve(__dirname, '../../projects/progress-report/extracted_products.json'),
    /** site-generator 側的原始商品 JSON */
    targetJson: resolve(__dirname, '../src/data/raw_products.json'),
    /** 分類配置檔 */
    categoryConfig: resolve(__dirname, '../src/data/categoryConfig.ts'),
    /** 同步日誌 */
    syncLog: resolve(__dirname, '../sync-log.json'),
} as const;

// ===== 類型定義 =====
interface RawItem {
    id: string;
    name: string;
    weight: string;
    price: number;
    url: string;
}

interface RawCategory {
    id: string;
    title: string;
    items: RawItem[];
}

interface SyncLogEntry {
    timestamp: string;
    sourceHash: string;
    targetHash: string;
    categoriesTotal: number;
    productsTotal: number;
    newCategories: string[];
    status: 'synced' | 'skipped' | 'error';
    message: string;
}

interface SyncLog {
    lastSync: string;
    entries: SyncLogEntry[];
}

// ===== 工具函數 =====

/**
 * 計算字串的 SHA-256 hash
 * @param content 原始內容字串
 * @returns 十六進位 hash 值
 */
function computeHash(content: string): string {
    return createHash('sha256').update(content, 'utf-8').digest('hex');
}

/**
 * 從 progress-report/index.html 提取 SOURCING_RAW 陣列
 * NOTE: 使用與原始 extract_data.py 相同的正則邏輯
 */
function extractFromHtml(htmlPath: string): RawCategory[] {
    if (!existsSync(htmlPath)) {
        throw new Error(`Source file not found: ${htmlPath}`);
    }

    const html = readFileSync(htmlPath, 'utf-8');
    const pattern = /const SOURCING_RAW\s*=\s*(\[[\s\S]*?\]);/;
    const match = html.match(pattern);

    if (!match || !match[1]) {
        throw new Error('Could not find SOURCING_RAW data in source HTML.');
    }

    try {
        const data: RawCategory[] = JSON.parse(match[1]);
        return data;
    } catch (err) {
        throw new Error(`Failed to parse SOURCING_RAW JSON: ${(err as Error).message}`);
    }
}

/**
 * 從分類 title 中解析出乾淨的英文名稱
 * e.g. "## 1. 傳統風水護身類 (Traditional Feng Shui Talismans)" → "Traditional Feng Shui Talismans"
 */
function parseCategoryName(rawTitle: string): string {
    const match = rawTitle.match(/\((.*?)\)/);
    return match ? match[1].trim() : rawTitle.replace(/#+\s*\d+\.\s*/, '').trim();
}

/**
 * 根據分類名稱關鍵字推斷設計風格（vibe）
 * NOTE: 此邏輯用於自動映射新分類到設計系統
 */
function inferVibe(categoryName: string): string {
    const lower = categoryName.toLowerCase();

    // 神秘/靈性/水晶/符號 → mystical
    if (/crystal|stone|sacred|symbol|energy|oracle|tarot/.test(lower)) return 'mystical';
    // 自然/草本/薰香 → natural
    if (/herb|incense|smudg|sage|nature|botanical/.test(lower)) return 'natural';
    // 科技/現代/工具 → technology
    if (/tech|tool|creator|sound|desk|setup|minimalist/.test(lower)) return 'technology';
    // 街頭/時尚/EDC → street
    if (/street|carry|everyday|urban|fashion/.test(lower)) return 'street';
    // 活力/御守 → energetic
    if (/omamori|sachet|charm|luck/.test(lower)) return 'energetic';
    // 企業/辦公 → corporate
    if (/corporate|office|business|desk feng/.test(lower)) return 'corporate';
    // 預設 → luxury
    return 'luxury';
}

/**
 * 根據 vibe 推斷模板和預設 ID
 */
function inferTemplateAndPreset(vibe: string): { template: string; presetId: string } {
    switch (vibe) {
        case 'street':
        case 'energetic':
            return { template: 'bold-street', presetId: 'J' };
        case 'technology':
            return { template: 'tech-modern', presetId: 'T' };
        default:
            return { template: 'minimal-luxury', presetId: 'A' };
    }
}

/**
 * 讀取現有 categoryConfig.ts 中已定義的分類名稱列表
 */
function getExistingCategories(configPath: string): Set<string> {
    if (!existsSync(configPath)) return new Set();

    const content = readFileSync(configPath, 'utf-8');
    // 匹配 "Category Name": { 格式
    const matches = content.matchAll(/"([^"]+)":\s*\{/g);
    const names = new Set<string>();
    for (const m of matches) {
        names.add(m[1]);
    }
    return names;
}

/**
 * 向 categoryConfig.ts 追加新分類定義
 */
function appendNewCategories(configPath: string, newCategories: string[]): void {
    if (newCategories.length === 0) return;
    if (!existsSync(configPath)) {
        console.warn(`⚠️  categoryConfig.ts not found at ${configPath}, skipping category append.`);
        return;
    }

    let content = readFileSync(configPath, 'utf-8');

    // 找到最後一個 }; （CATEGORY_CONFIG 物件的結尾）
    const closingIndex = content.lastIndexOf('};');
    if (closingIndex === -1) {
        console.warn('⚠️  Could not find closing }; in categoryConfig.ts');
        return;
    }

    // 生成新分類的 TypeScript 代碼
    const newEntries = newCategories.map(name => {
        const vibe = inferVibe(name);
        const { template, presetId } = inferTemplateAndPreset(vibe);
        // 從分類名中提取關鍵字
        const keywords = name.split(/[\s&]+/)
            .filter(w => w.length > 2)
            .slice(0, 5)
            .map(w => `"${w}"`);

        return `    // NOTE: 由同步腳本自動生成 (${new Date().toISOString().split('T')[0]})
    "${name}": {
        name: "${name}",
        vibe: "${vibe}",
        template: "${template}",
        productKeywords: [${keywords.join(', ')}],
        presetId: '${presetId}'
    }`;
    });

    // 在 }; 前插入新分類
    const beforeClose = content.substring(0, closingIndex);
    const afterClose = content.substring(closingIndex);

    // 確保前面有逗號
    const trimmedBefore = beforeClose.trimEnd();
    const needsComma = !trimmedBefore.endsWith(',') && !trimmedBefore.endsWith('{');
    const comma = needsComma ? ',' : '';

    content = trimmedBefore + comma + '\n' + newEntries.join(',\n') + '\n' + afterClose;

    writeFileSync(configPath, content, 'utf-8');
    console.log(`✅ 已追加 ${newCategories.length} 個新分類到 categoryConfig.ts`);
}

/**
 * 讀取或初始化同步日誌
 */
function loadSyncLog(logPath: string): SyncLog {
    if (existsSync(logPath)) {
        try {
            return JSON.parse(readFileSync(logPath, 'utf-8'));
        } catch {
            // 日誌損壞，重新初始化
        }
    }
    return { lastSync: '', entries: [] };
}

/**
 * 寫入同步日誌（保留最近 50 條記錄）
 */
function saveSyncLog(logPath: string, log: SyncLog): void {
    // 只保留最近 50 條
    if (log.entries.length > 50) {
        log.entries = log.entries.slice(-50);
    }
    writeFileSync(logPath, JSON.stringify(log, null, 2), 'utf-8');
}

// ===== 主邏輯 =====

function main(): void {
    const startTime = Date.now();
    console.log('\n🔄 商品資料庫同步開始...');
    console.log(`📂 來源: ${PATHS.sourceHtml}`);
    console.log(`📂 目標: ${PATHS.targetJson}\n`);

    const syncLog = loadSyncLog(PATHS.syncLog);
    const timestamp = new Date().toISOString();

    try {
        // 1. 從 HTML 提取數據
        console.log('📖 正在從 progress-report 提取商品數據...');
        const categories = extractFromHtml(PATHS.sourceHtml);
        const totalProducts = categories.reduce((sum, cat) => sum + cat.items.length, 0);
        console.log(`   找到 ${categories.length} 個分類，共 ${totalProducts} 項商品`);

        // 2. 序列化新數據
        const newJson = JSON.stringify(categories, null, 2);
        const newHash = computeHash(newJson);

        // 3. 讀取現有數據並比對 hash
        let oldHash = '';
        if (existsSync(PATHS.targetJson)) {
            const oldJson = readFileSync(PATHS.targetJson, 'utf-8');
            oldHash = computeHash(oldJson);
        }

        if (newHash === oldHash) {
            console.log('✅ 數據無變更，跳過同步。\n');
            const entry: SyncLogEntry = {
                timestamp,
                sourceHash: newHash,
                targetHash: oldHash,
                categoriesTotal: categories.length,
                productsTotal: totalProducts,
                newCategories: [],
                status: 'skipped',
                message: 'No changes detected.',
            };
            syncLog.entries.push(entry);
            syncLog.lastSync = timestamp;
            saveSyncLog(PATHS.syncLog, syncLog);
            return;
        }

        // 4. 有差異 → 寫入新數據
        console.log('📝 檢測到變更，正在同步...');
        writeFileSync(PATHS.targetJson, newJson, 'utf-8');
        console.log(`   ✅ raw_products.json 已更新 (${(newJson.length / 1024).toFixed(1)} KB)`);

        // 同時更新 progress-report 側的 extracted_products.json（保持一致）
        writeFileSync(PATHS.sourceJson, newJson, 'utf-8');
        console.log('   ✅ extracted_products.json 已同步');

        // 5. 檢測新分類
        const existingCategories = getExistingCategories(PATHS.categoryConfig);
        const extractedNames = categories.map(cat => parseCategoryName(cat.title));
        const newCategories = extractedNames.filter(name => !existingCategories.has(name));

        if (newCategories.length > 0) {
            console.log(`\n🆕 發現 ${newCategories.length} 個新分類:`);
            newCategories.forEach(name => console.log(`   • ${name}`));
            appendNewCategories(PATHS.categoryConfig, newCategories);
        }

        // 6. 寫入日誌
        const entry: SyncLogEntry = {
            timestamp,
            sourceHash: newHash,
            targetHash: oldHash,
            categoriesTotal: categories.length,
            productsTotal: totalProducts,
            newCategories,
            status: 'synced',
            message: `Synced ${categories.length} categories, ${totalProducts} products.${newCategories.length > 0 ? ` New categories: ${newCategories.join(', ')}` : ''}`,
        };
        syncLog.entries.push(entry);
        syncLog.lastSync = timestamp;
        saveSyncLog(PATHS.syncLog, syncLog);

        const elapsed = Date.now() - startTime;
        console.log(`\n🎉 同步完成！耗時 ${elapsed}ms`);
        console.log(`   📊 ${categories.length} 分類 | ${totalProducts} 商品 | ${newCategories.length} 新分類\n`);

    } catch (err) {
        const errorMessage = (err as Error).message;
        console.error(`\n❌ 同步失敗: ${errorMessage}\n`);

        const entry: SyncLogEntry = {
            timestamp,
            sourceHash: '',
            targetHash: '',
            categoriesTotal: 0,
            productsTotal: 0,
            newCategories: [],
            status: 'error',
            message: errorMessage,
        };
        syncLog.entries.push(entry);
        syncLog.lastSync = timestamp;
        saveSyncLog(PATHS.syncLog, syncLog);

        process.exit(1);
    }
}

main();
