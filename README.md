# AI Frontier Atlas / 前沿图谱

独立的全球 AI 前沿追踪与关键技术系统学习网站。

## Routes

- `/`：情报与学习总览
- `/frontier/`：带证据等级的前沿情报流
- `/learn/`：六条系统学习路线
- `/learn/[slug]/`：课程详情
- `/method/`：来源分级与维护方法

## Local workflow

```bash
npm ci
npm test
npm run review:site
npm run check
npm run build
npm run verify:build
```

每次维护前必须先执行 `npm run review:site`，读取 `ops/site-review.json`，再把计划写入 `ops/logs/`。完整规则见 `ops/MAINTENANCE.md`。

## Deployment

推送 `main` 后由 GitHub Actions 部署到：

```text
https://sunshine0912-love.github.io/ai-frontier-atlas/
```
