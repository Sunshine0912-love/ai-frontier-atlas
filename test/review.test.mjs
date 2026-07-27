import assert from 'node:assert/strict';
import test from 'node:test';
import { buildReview } from '../scripts/review-site.mjs';

test('reviews the current site before planning the next update', () => {
  const review = buildReview({
    frontier: [{ publishedAt: '2026-07-26', category: '模型', slug: 'a' }],
    lessons: [{ track: 'agent', updatedAt: '2026-07-20', slug: 'b' }],
    tracks: [{ id: 'agent', title: 'Agent' }, { id: 'multimodal', title: '多模态' }]
  }, new Date('2026-07-27T00:00:00Z'));

  assert.equal(review.summary.frontierItems, 1);
  assert.equal(review.summary.lessons, 1);
  assert.ok(review.gaps.some(gap => gap.includes('多模态')));
});
