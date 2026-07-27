import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const required = [
  ['dist/index.html', '追踪 AI 前沿'],
  ['dist/frontier/index.html', '前沿情报流'],
  ['dist/learn/index.html', '系统学习路径'],
  ['dist/method/index.html', '来源与方法'],
  ['dist/learn/kv-cache-to-continuous-batching/index.html', '从 KV Cache 到 Continuous Batching']
];

for (const [file, marker] of required) {
  const absolute = resolve(file);
  if (!existsSync(absolute)) throw new Error(`缺少构建页面：${file}`);
  const html = readFileSync(absolute, 'utf8');
  if (!html.includes(marker)) throw new Error(`${file} 缺少关键内容：${marker}`);
}

console.log(`构建页面验证通过：${required.length}/${required.length}`);
