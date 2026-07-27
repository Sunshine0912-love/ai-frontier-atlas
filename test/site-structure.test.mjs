import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';

const root = resolve(import.meta.dirname, '..');
const read = (path) => readFileSync(resolve(root, path), 'utf8');

test('defines independent home, frontier, learning and methodology routes', () => {
  assert.match(read('src/pages/index.astro'), /AI Frontier Atlas/);
  assert.match(read('src/pages/frontier/index.astro'), /前沿情报流/);
  assert.match(read('src/pages/learn/index.astro'), /系统学习路径/);
  assert.match(read('src/pages/method/index.astro'), /来源与方法/);
});

test('build configuration targets the independent project path', () => {
  const config = read('astro.config.mjs');
  assert.match(config, /ai-frontier-atlas/);
  assert.doesNotMatch(config, /xiaoguang-blog/);
});
