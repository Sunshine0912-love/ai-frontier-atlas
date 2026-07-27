import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const required = [
  ['dist/index.html', '研究工作台'],
  ['dist/frontier/index.html', '信号矩阵'],
  ['dist/learn/index.html', '四阶段'],
  ['dist/method/index.html', '评分方法'],
  ['dist/learn/kv-cache-to-continuous-batching/index.html', '动手实验'],
  ['dist/learn/preference-alignment-from-rlhf-to-dpo/index.html', '偏好对齐'],
  ['dist/learn/clip-contrastive-multimodal-learning/index.html', '对比学习'],
  ['dist/learn/holistic-llm-evaluation/index.html', '整体评测']
];

for (const [file, marker] of required) {
  const absolute = resolve(file);
  if (!existsSync(absolute)) throw new Error(`缺少构建页面：${file}`);
  const html = readFileSync(absolute, 'utf8');
  if (!html.includes(marker)) throw new Error(`${file} 缺少关键内容：${marker}`);
}

console.log(`构建页面验证通过：${required.length}/${required.length}`);
