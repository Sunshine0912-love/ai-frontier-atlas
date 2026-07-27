import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');

function daysBetween(now, date) {
  if (!date) return null;
  return Math.max(0, Math.floor((now.getTime() - Date.parse(`${date}T00:00:00Z`)) / 86400000));
}

export function buildReview({ frontier, lessons, tracks }, now = new Date()) {
  const categoryCoverage = Object.fromEntries(
    [...new Set(frontier.map(item => item.category))]
      .map(category => [category, frontier.filter(item => item.category === category).length])
      .sort((a, b) => b[1] - a[1])
  );
  const trackCoverage = tracks.map(track => {
    const items = lessons.filter(lesson => lesson.track === track.id);
    const latest = items.map(item => item.updatedAt).sort().at(-1) || '';
    return {
      id: track.id,
      title: track.title,
      lessons: items.length,
      latest,
      daysSinceLatest: daysBetween(now, latest)
    };
  });
  const gaps = trackCoverage
    .filter(track => track.lessons === 0 || track.daysSinceLatest > 45)
    .map(track => track.lessons === 0
      ? `「${track.title}」路线尚无课程，应先补齐核心入门节点。`
      : `「${track.title}」路线超过 45 天未更新，应复查内容与来源。`);

  return {
    version: 1,
    generatedAt: now.toISOString(),
    summary: {
      frontierItems: frontier.length,
      lessons: lessons.length,
      tracks: tracks.length,
      latestFrontierDate: frontier.map(item => item.publishedAt).sort().at(-1) || '',
      latestLessonDate: lessons.map(item => item.updatedAt).sort().at(-1) || ''
    },
    categoryCoverage,
    trackCoverage,
    recentFrontier: [...frontier].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)).slice(0, 8).map(item => ({
      slug: item.slug,
      title: item.title,
      publishedAt: item.publishedAt,
      category: item.category,
      evidenceLevel: item.evidenceLevel
    })),
    gaps,
    nextDirection: gaps[0] || '复查最薄路线，并优先选择有一手来源的新内容。'
  };
}

function readJson(relativePath) {
  return JSON.parse(readFileSync(resolve(projectRoot, relativePath), 'utf8'));
}

function main() {
  const review = buildReview({
    frontier: readJson('src/data/frontier.json'),
    lessons: readJson('src/data/lessons.json'),
    tracks: readJson('src/data/tracks.json')
  });
  const output = resolve(projectRoot, 'ops/site-review.json');
  mkdirSync(dirname(output), { recursive: true });
  writeFileSync(output, `${JSON.stringify(review, null, 2)}\n`);
  console.log(`回顾完成：${review.summary.frontierItems} 条前沿信号，${review.summary.lessons} 节课程。`);
  for (const gap of review.gaps) console.log(`- ${gap}`);
  console.log(`下一方向：${review.nextDirection}`);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();
