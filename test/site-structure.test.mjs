import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';

const root = resolve(import.meta.dirname, '..');
const read = (path) => readFileSync(resolve(root, path), 'utf8');

test('defines a research workbench, intelligence matrix and staged curriculum', () => {
  const home = read('src/pages/index.astro');
  const frontier = read('src/pages/frontier/index.astro');
  const learning = read('src/pages/learn/index.astro');
  const lesson = read('src/pages/learn/[slug].astro');
  const method = read('src/pages/method/index.astro');

  assert.match(home, /研究工作台/);
  assert.match(home, /DomainMatrix/);
  assert.match(frontier, /信号矩阵/);
  assert.match(frontier, /data-evidence/);
  assert.match(learning, /四阶段/);
  assert.match(learning, /先修/);
  assert.match(lesson, /lesson-toc/);
  assert.match(lesson, /动手实验/);
  assert.match(lesson, /决策表/);
  assert.match(method, /评分方法/);
});

test('build configuration targets the independent project path', () => {
  const config = read('astro.config.mjs');
  assert.match(config, /ai-frontier-atlas/);
  assert.doesNotMatch(config, /xiaoguang-blog/);
});

test('typography has a readable floor and long-form article styles', () => {
  const css = read('src/styles/global.css');
  const pxSizes = [...css.matchAll(/font-size:\s*([0-9.]+)px/g)].map(match => Number(match[1]));
  assert.ok(pxSizes.length > 0);
  assert.ok(Math.min(...pxSizes) >= 12, `found ${Math.min(...pxSizes)}px text`);
  assert.match(css, /body\s*\{[^}]*font-size:\s*16px/s);
  assert.match(css, /\.article-prose\s*\{[^}]*font-size:\s*17px/s);
  assert.match(css, /--muted:\s*#425166/);
  assert.match(css, /--faint:\s*#5f6e82/);
});

test('lesson route renders chapters and local KaTeX formulas', () => {
  const lesson = read('src/pages/learn/[slug].astro');
  const layout = read('src/components/Layout.astro');
  assert.match(lesson, /articles\.json/);
  assert.match(lesson, /MathBlock/);
  assert.match(lesson, /article-prose/);
  assert.match(layout, /katex\/dist\/katex\.min\.css/);
});
