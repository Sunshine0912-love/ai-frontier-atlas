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
