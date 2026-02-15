# HANDOVER.md — 專案交接文件

> 最後更新：2026-02-15
> 撰寫者：Antigravity Agent (Phase 1–16)

---

## 專案概述

**Universal Site Generator Prototype** — 一個 AI 驅動的動態電商網站生成器原型。使用者點擊一個按鈕，系統模擬 5 位 AI Agent 協作，在數秒內生成一個完整的、有主題風格的電商網站（含導航、產品目錄、商品詳情、購物車、結帳流程）。

**核心賣點**：每次生成結果都不同 — 從 67+ 風格數據集隨機組合，產生獨特的「奢華極簡」「街頭潮流」「未來科技」等不同美學。

---

## 已完成功能（共 16 個階段）

### ✅ 核心引擎
- 多 Agent 模擬系統（5 位 AI Agent，各有技能分配）
- `StyleSynthesizer` — 從 CSV 數據生成動態主題（67+ 風格）
- `ContentGenerator` — 語義感知的品牌文案與產品內容生成
- `StyleIntelligence` — 分類 → 氛圍 → 配色的語義映射
- `ProductDataManager` — 管理 2400+ 件真實商品數據
- `TopicSelector` — 隨機選擇商品分類

### ✅ 動態組件
- `DynamicNavbar` — 玻璃態/實色/透明導航列
- `DynamicHero` — 分割/置中/Bento 等多種佈局
- `DynamicProductGrid` — 瀑布流/輪播/網格
- `DynamicCart` — 即時購物車抽屜
- `AgentTerminal` — 模擬生成過程的終端機 UI

### ✅ 多頁面路由
- `/` 首頁 (Hero + 產品展示)
- `/about` 品牌故事
- `/catalog` 完整產品目錄
- `/contact` 聯絡表單
- `/product/:id` 商品詳情
- `/checkout` 多步驟結帳
- `/order-success` 訂單成功

### ✅ 電商模擬（Phase 16 - 最新）
- `CartContext` — 全域購物車狀態 + `localStorage` 持久化
- 加入購物車動畫反饋 ("ADDED!")
- 三步驟結帳流程（運送 → 付款 → 處理中）
- 表單驗證（必填欄位 + email 格式）
- 模擬付款處理（2 秒 spinner）
- 訂單成功頁（含狀態保護：無 state 時導回首頁）

### ✅ 開發者工具
- `GodModePanel` — 懸浮控制面板，手動切換 Luxe/Hype/Future 預設
- Export Code 模擬按鈕

---

## 已知 Bug 與技術債

### 🐛 已知 Bug

| 優先級 | 描述 | 位置 |
|---|---|---|
| 低 | 瀏覽器自動化（Playwright/Puppeteer）填寫 `CheckoutPage` 表單時，React controlled input 不會正確觸發 `onChange`。**真實用戶打字操作不受影響。** | `CheckoutPage.tsx` |
| 低 | `build_error.log` / `errors.txt` / `compile_errors.txt` 等歷史除錯檔案仍在根目錄，應清理 | 根目錄 |

### ⚠️ 技術債 / 需要注意的「坑」

1. **主題系統依賴 inline style** — 所有動態色彩透過 `style={{ color: theme.colors.primary }}` 注入，不是 Tailwind class。這意味著 Tailwind 的 `purge` 不會影響這些樣式，但也無法使用 Tailwind 的 `hover:` `dark:` 等修飾符。
2. **產品圖片是 placeholder** — 所有產品圖片使用 gradient 背景或色塊，沒有真實圖片 URL。若要接入真實圖片，需修改 `ContentGenerator.ts` 的產品生成邏輯。
3. **無後端 API** — 所有數據都是前端生成的模擬數據。購物車用 `localStorage`，無用戶認證、無訂單持久化。
4. **CSV 數據量大** — `styles.csv` (96KB) 和 `landing.csv` (14KB) 在首次載入時同步解析，可能在低端設備上造成短暫卡頓。
5. **`DynamicRendererContext` 職責過多** — 該 Context 同時管理 Agent 模擬、日誌、主題生成、內容生成。建議未來拆分為更小的 Context。
6. **Framer Motion 類型兼容性** — 部分 `motion.div` 可能在嚴格類型檢查下觸發 `HTMLAttributes` 警告，已透過 `typings.d.ts` 修補。

---

## 原訂的下一步計畫（建議接手代理人優先處理）

### 🔜 Step 1：部署更新至 Vercel
Phase 16 的所有變更尚未部署至生產環境。建議執行 `npm run build` 確認零錯誤後，透過 Git push 觸發 Vercel 自動部署。已有 `.vercel/` 配置目錄。

### 🔜 Step 2：商品圖片系統
目前所有產品使用色塊/漸變作為圖片替代。建議：
- 方案 A：整合 Unsplash/Pexels API 動態抓取對應分類圖片
- 方案 B：使用 AI 圖片生成工具（如 `generate_image`）為每個分類預生成一組圖片
- 需修改 `ContentGenerator.ts` 中的 `generateProducts()` 方法

### 🔜 Step 3：SEO 與 Meta 動態注入
當前頁面的 `<title>` 和 `<meta>` 標籤是靜態的。建議：
- 使用 `react-helmet-async` 為每個頁面注入動態標題和描述
- 基於生成的品牌名稱和分類自動生成 OpenGraph 標籤
- 為 `/product/:id` 頁面生成結構化數據 (JSON-LD)

---

## 環境與部署

| 項目 | 值 |
|---|---|
| 本地開發 | `npm run dev` → `http://localhost:5173` |
| 生產構建 | `npm run build` → `dist/` |
| 部署平台 | Vercel（已配置） |
| Node 版本 | ≥ 18 |
| 包管理器 | npm |
