import assert from 'node:assert/strict';
import test from 'node:test';
import { buildReview } from '../scripts/review-site.mjs';

test('reviews the current site before planning the next update', () => {
  const review = buildReview({
    frontier: [{
      publishedAt: '2026-07-26', category: '模型', slug: 'a',
      scores: { novelty: 4, impact: 5, evidence: 4, reproducibility: 2 },
      sources: [{ url: 'https://example.com' }]
    }],
    lessons: [{
      track: 'agent', updatedAt: '2026-07-20', slug: 'b',
      sources: [{ url: 'https://a.example' }, { url: 'https://b.example' }],
      objectives: ['a', 'b', 'c'],
      lab: { steps: ['a', 'b', 'c'] }
    }],
    tracks: [
      { id: 'agent', title: 'Agent', plannedLessons: 6 },
      { id: 'multimodal', title: '多模态', plannedLessons: 5 }
    ]
  }, new Date('2026-07-27T00:00:00Z'));

  assert.equal(review.summary.frontierItems, 1);
  assert.equal(review.summary.lessons, 1);
  assert.equal(review.quality.frontierScoreCoverage, '1/1');
  assert.equal(review.quality.deepLessonCoverage, '1/1');
  assert.equal(review.trackCoverage[0].readiness, '1/6');
  assert.ok(review.gaps.some(gap => gap.includes('多模态')));
});
