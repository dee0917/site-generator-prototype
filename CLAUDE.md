# CLAUDE.md — 開發環境指令與代碼規範

> 本文件供所有 AI Agent 與開發者參考，確保一致的開發體驗。

---

## 開發環境

| 項目 | 版本 / 工具 |
|---|---|
| 語言 | TypeScript ~5.9 (strict mode) |
| 框架 | React 19 + Vite 7 |
| CSS | Tailwind CSS 4 (via `@tailwindcss/vite` plugin) |
| 路由 | react-router-dom 7 |
| 動畫 | framer-motion 12 |
| 圖示 | lucide-react |
| 資料解析 | papaparse (CSV) |
| Node 版本 | ≥ 18 (建議 20+) |

---

## 快速啟動

```bash
# 1. 安裝依賴
npm install

# 2. 啟動開發伺服器 (預設 http://localhost:5173)
npm run dev

# 3. 類型檢查
npx tsc --noEmit

# 4. ESLint 檢查
npm run lint

# 5. 生產構建
npm run build

# 6. 預覽生產構建
npm run preview
```

---

## 代碼風格規範

### 命名規則
| 類型 | 規範 | 範例 |
|---|---|---|
| 變數 / 函式 | camelCase | `handleAddToCart`, `itemCount` |
| 類別 / 組件 | PascalCase | `CartContext`, `DynamicHero` |
| 常量 | UPPER_SNAKE_CASE | `THEME_POOL`, `GOLDEN_PRESETS` |
| 檔案 / 目錄 | PascalCase (組件), camelCase (工具) | `CheckoutPage.tsx`, `themePool.ts` |

### TypeScript 嚴格規則
- `strict: true` — 所有型別必須顯式宣告
- `noUnusedLocals: true` — 禁止未使用的變數
- `noUnusedParameters: true` — 禁止未使用的參數
- `noFallthroughCasesInSwitch: true`

### React 規範
- **函式組件** — 禁止使用 class component
- **Props 必須定義 interface** — 使用 `interface XxxProps {}`
- **所有註釋使用繁體中文** — 代碼標識符保留英文
- 使用 `React.FC<Props>` 型別標注組件

### 註釋標記
```ts
// TODO: 待實現功能
// FIXME: 已知問題或潛在缺陷
// NOTE: 重要設計說明
// HACK: 臨時方案，後續必須重構
```

### CSS / Styling
- 使用 Tailwind CSS utility classes（透過 Vite plugin 整合）
- 動態主題透過 inline `style` 注入（非 Tailwind classes）
- 全域樣式位於 `src/index.css`

---

## 目錄結構概覽

```
src/
├── engine/        # 生成引擎核心邏輯 (7 modules)
├── components/
│   ├── dynamic/   # 主題感知動態組件 (Hero, Navbar, Cart, Grid, Terminal)
│   ├── dashboard/ # 開發者控制面板 (GodModePanel)
│   └── layout/    # 頁面佈局框架 (SiteLayout)
├── context/       # React Context (Cart 購物車, DynamicRenderer 生成器)
├── pages/         # 路由頁面 (7 pages)
├── types/         # TypeScript 型別定義 (5 files)
├── data/          # 靜態資料 (CSV, JSON, Config)
└── lib/           # 工具函式
```

---

## 重要提示

1. **不要直接修改 `dist/` 目錄** — 它由 `npm run build` 自動生成
2. **`raw_products.json` 是真實產品數據源** (2400+ 商品)，修改前請備份
3. **主題系統是動態生成的** — 所有顏色/字體/間距由 `StyleSynthesizer` 在運行時決定，不是靜態 CSS
4. **購物車使用 `localStorage`** — 清除瀏覽器數據會清空購物車
