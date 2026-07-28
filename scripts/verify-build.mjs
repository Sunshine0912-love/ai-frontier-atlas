import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const required = [
  ['dist/index.html', '研究工作台'],
  ['dist/frontier/index.html', '信号矩阵'],
  ['dist/learn/index.html', '四阶段'],
  ['dist/method/index.html', '评分方法']
];

const lessons = JSON.parse(readFileSync(resolve('src/data/lessons.json'), 'utf8'));
for (const lesson of lessons) {
  required.push([`dist/learn/${lesson.slug}/index.html`, lesson.title]);
}

for (const [file, marker] of required) {
  const absolute = resolve(file);
  if (!existsSync(absolute)) throw new Error(`缺少构建页面：${file}`);
  const html = readFileSync(absolute, 'utf8');
  if (!html.includes(marker)) throw new Error(`${file} 缺少关键内容：${marker}`);
}

console.log(`构建页面验证通过：${required.length}/${required.length}`);
