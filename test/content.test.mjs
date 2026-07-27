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
    assert.ok(item.domain && item.stage && item.organization);
    assert.ok(item.mechanism.length >= 40);
    assert.ok(item.watchNext.length >= 20);
    assert.deepEqual(Object.keys(item.scores).sort(), ['evidence', 'impact', 'novelty', 'reproducibility']);
    assert.ok(Object.values(item.scores).every(score => Number.isInteger(score) && score >= 1 && score <= 5));
  }
});

test('every research track has a complete, practice-oriented lesson', () => {
  const lessons = readJson('src/data/lessons.json');
  const tracks = readJson('src/data/tracks.json');
  assert.ok(lessons.length >= tracks.length);
  assert.equal(new Set(lessons.map(item => item.slug)).size, lessons.length);
  assert.deepEqual(
    [...new Set(lessons.map(lesson => lesson.track))].sort(),
    tracks.map(track => track.id).sort()
  );
  for (const lesson of lessons) {
    assert.ok(lesson.objectives.length >= 3);
    assert.ok(lesson.prerequisites.length >= 2);
    assert.ok(lesson.keyTerms.length >= 4);
    assert.ok(lesson.conceptMap.length >= 2);
    assert.ok(lesson.mentalModel.length >= 80);
    assert.ok(lesson.mechanism.length >= 3);
    assert.ok(lesson.codePath.length >= 2);
    assert.ok(lesson.tensorFlow.length >= 2);
    assert.ok(lesson.pseudocode.length >= 5);
    assert.ok(lesson.engineeringMeaning.length >= 2);
    assert.ok(lesson.decisionTable.length >= 2);
    assert.ok(lesson.lab.steps.length >= 3);
    assert.ok(lesson.lab.successCriteria.length >= 2);
    assert.ok(lesson.selfCheck.length >= 2);
    assert.ok(lesson.sources.length >= 2);
  }
});

test('six learning tracks form a staged curriculum', () => {
  const tracks = readJson('src/data/tracks.json');
  assert.equal(tracks.length, 6);
  assert.equal(new Set(tracks.map(track => track.id)).size, 6);
  assert.equal(new Set(tracks.map(track => track.stage)).size, 4);
  for (const track of tracks) {
    assert.ok(Array.isArray(track.prerequisites));
    assert.ok(track.outcomes.length >= 2);
    assert.ok(track.plannedLessons >= 3);
    assert.ok(Number.isInteger(track.labCount) && track.labCount >= 1);
    assert.ok(['available', 'expanding'].includes(track.status));
  }
});
