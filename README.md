# mksoft-www

www.mksoft.uk 的主页，React + Vite，中文 / 日文两版。

- 文案：`src/i18n.js`
- 「在路上」的照片：放进 `public/img/`，再加到 `src/App.jsx` 顶部的 `ROAD_PHOTOS`
- 本地预览：`npm install && npm run dev`

Cloudflare 部署设置：构建命令 `npm run build`，部署命令 `npx wrangler deploy`（读取 `wrangler.jsonc`，发布 `dist/`）。
