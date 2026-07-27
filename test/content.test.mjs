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
    assert.ok(lesson.sources.length >= 3);
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

test('every track publishes its complete ordered syllabus', () => {
  const tracks = readJson('src/data/tracks.json');
  const syllabus = readJson('src/data/syllabus.json');
  const lessons = readJson('src/data/lessons.json');
  for (const track of tracks) {
    const items = syllabus.filter(item => item.track === track.id);
    const availableLessons = lessons.filter(lesson => lesson.track === track.id);
    assert.equal(items.length, track.plannedLessons, `${track.id} syllabus is incomplete`);
    assert.deepEqual(items.map(item => item.order), Array.from({ length: track.plannedLessons }, (_, index) => index + 1));
    assert.ok(items.every(item => item.title.length >= 6 && item.focus.length >= 18));
    assert.ok(items.every(item => ['available', 'planned'].includes(item.status)));
    assert.equal(items.filter(item => item.status === 'available').length, availableLessons.length);
    assert.ok(items.filter(item => item.status === 'available').every(item => item.slug));
  }
});

test('every published lesson has a research-grade long-form article', () => {
  const lessons = readJson('src/data/lessons.json');
  const articles = readJson('src/data/articles.json');
  assert.deepEqual(articles.map(item => item.slug).sort(), lessons.map(item => item.slug).sort());
  for (const article of articles) {
    const prose = article.chapters.flatMap(chapter => chapter.paragraphs).join('');
    assert.ok(prose.length >= 1800, `${article.slug} needs substantial explanatory prose`);
    assert.ok(article.chapters.length >= 7);
    assert.ok(article.chapters.every(chapter => chapter.id && chapter.title && chapter.paragraphs.length >= 2));
    assert.ok(article.formulas.length >= 2);
    assert.ok(article.formulas.every(formula => formula.latex && formula.symbols.length >= 2 && formula.intuition.length >= 30));
    assert.ok(article.workedExample.steps.length >= 3);
    assert.ok(article.implementationMap.length >= 3);
    assert.ok(article.limitations.length >= 3);
    assert.ok(article.takeaways.length >= 4);
  }
});
