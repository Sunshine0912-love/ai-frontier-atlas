import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');

function daysBetween(now, date) {
  if (!date) return null;
  return Math.max(0, Math.floor((now.getTime() - Date.parse(`${date}T00:00:00Z`)) / 86400000));
}

export function buildReview({ frontier, lessons, tracks, articles = [], syllabus = [] }, now = new Date()) {
  const categoryCoverage = Object.fromEntries(
    [...new Set(frontier.map(item => item.category))]
      .map(category => [category, frontier.filter(item => item.category === category).length])
      .sort((a, b) => b[1] - a[1])
  );
  const trackCoverage = tracks.map(track => {
    const items = lessons.filter(lesson => lesson.track === track.id);
    const latest = items.map(item => item.updatedAt).sort().at(-1) || '';
    const planned = track.plannedLessons || 0;
    return {
      id: track.id,
      title: track.title,
      lessons: items.length,
      planned,
      readiness: `${items.length}/${planned || items.length}`,
      latest,
      daysSinceLatest: daysBetween(now, latest)
    };
  });
  const gaps = trackCoverage
    .filter(track => track.lessons === 0 || track.daysSinceLatest > 45)
    .map(track => track.lessons === 0
      ? `「${track.title}」路线尚无课程，应先补齐核心入门节点。`
      : `「${track.title}」路线超过 45 天未更新，应复查内容与来源。`);
  const scoredFrontier = frontier.filter(item => {
    const scores = item.scores || {};
    return ['novelty', 'impact', 'evidence', 'reproducibility']
      .every(key => Number.isInteger(scores[key]));
  }).length;
  const deepLessons = lessons.filter(lesson =>
    (lesson.sources?.length || 0) >= 2
    && (lesson.lab?.steps?.length || 0) >= 3
    && (lesson.objectives?.length || 0) >= 3
  ).length;
  const sourceCount = frontier.reduce((sum, item) => sum + (item.sources?.length || 0), 0)
    + lessons.reduce((sum, item) => sum + (item.sources?.length || 0), 0);
  const researchArticles = articles.filter(article =>
    (article.chapters?.length || 0) >= 7
    && article.chapters.flatMap(chapter => chapter.paragraphs || []).join('').length >= 1800
    && (article.formulas?.length || 0) >= 2
    && (article.limitations?.length || 0) >= 3
  ).length;
  const completeSyllabi = tracks.filter(track =>
    syllabus.filter(item => item.track === track.id).length === track.plannedLessons
  ).length;
  if (scoredFrontier < frontier.length) {
    gaps.push(`${frontier.length - scoredFrontier} 条前沿信号缺少完整四维评分。`);
  }
  if (deepLessons < lessons.length) {
    gaps.push(`${lessons.length - deepLessons} 节课程未达到目标/实验/双来源的深度标准。`);
  }
  if (articles.length && researchArticles < lessons.length) {
    gaps.push(`${lessons.length - researchArticles} 节已发布课程尚未达到研究长文标准。`);
  }
  if (syllabus.length && completeSyllabi < tracks.length) {
    gaps.push(`${tracks.length - completeSyllabi} 条路线的 syllabus 尚未完整公开。`);
  }

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
    quality: {
      frontierScoreCoverage: `${scoredFrontier}/${frontier.length}`,
      deepLessonCoverage: `${deepLessons}/${lessons.length}`,
      researchArticleCoverage: `${researchArticles}/${lessons.length}`,
      syllabusCoverage: `${completeSyllabi}/${tracks.length}`,
      directReferences: sourceCount
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
    tracks: readJson('src/data/tracks.json'),
    articles: readJson('src/data/articles.json'),
    syllabus: readJson('src/data/syllabus.json')
  });
  const output = resolve(projectRoot, 'ops/site-review.json');
  mkdirSync(dirname(output), { recursive: true });
  writeFileSync(output, `${JSON.stringify(review, null, 2)}\n`);
  console.log(`回顾完成：${review.summary.frontierItems} 条前沿信号，${review.summary.lessons} 节课程。`);
  for (const gap of review.gaps) console.log(`- ${gap}`);
  console.log(`下一方向：${review.nextDirection}`);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();
