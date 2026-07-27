import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';

const root = resolve(import.meta.dirname, '..');
const readJson = (path) => JSON.parse(readFileSync(resolve(root, path), 'utf8'));

test('frontier signals use unique slugs and traceable sources', () => {
  const items = readJson('src/data/frontier.json');
  assert.ok(items.length >= 4);
  assert.equal(new Set(items.map(item => item.slug)).size, items.length);
  for (const item of items) {
    assert.match(item.publishedAt, /^\d{4}-\d{2}-\d{2}$/);
    assert.ok(['S', 'A'].includes(item.evidenceLevel));
    assert.ok(item.sources.length >= 1);
    assert.ok(item.sources.every(source => /^https:\/\//.test(source.url)));
    assert.ok(item.fact && item.impact && item.uncertainty);
  }
});

test('every learning lesson contains the four-part learning contract', () => {
  const lessons = readJson('src/data/lessons.json');
  assert.ok(lessons.length >= 3);
  assert.equal(new Set(lessons.map(item => item.slug)).size, lessons.length);
  for (const lesson of lessons) {
    assert.ok(lesson.conceptMap.length >= 2);
    assert.ok(lesson.codePath.length >= 2);
    assert.ok(lesson.engineeringMeaning.length >= 2);
    assert.ok(lesson.selfCheck.length >= 2);
    assert.ok(lesson.sources.length >= 1);
  }
});

test('six learning tracks are defined', () => {
  const tracks = readJson('src/data/tracks.json');
  assert.equal(tracks.length, 6);
  assert.equal(new Set(tracks.map(track => track.id)).size, 6);
});
