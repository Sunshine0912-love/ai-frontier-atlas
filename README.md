# AI Frontier Atlas / 前沿图谱

面向研究者与相关从业者的 AI 研究工作台：用统一 taxonomy 连接全球前沿信号、技术机制、工程判断、系统课程与可复现实验。

## Routes

- `/`：研究简报、信号看板、研究域矩阵与四阶段能力路径
- `/frontier/`：带机制、证据边界、四维评分与下一观察点的情报矩阵
- `/learn/`：四阶段、六研究域的系统课程
- `/learn/[slug]/`：含目标、先修、张量/代码、决策表、实验和自检的课程
- `/method/`：来源分级、claim 边界、评分方法与维护流程

## Content contract

- 前沿信号：`fact`、`mechanism`、`impact`、`uncertainty`、`watchNext`、四维评分和直接来源。
- 系统课程：学习目标、先修、术语、心智模型、机制、张量、伪代码、工程决策、实验、自检和至少两个一手参考。
- 六个研究域使用同一 taxonomy：基础模型、多模态表示、训练与对齐、推理与服务、Agent 系统、评测与安全。

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
