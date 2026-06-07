import { NextResponse } from 'next/server';
import { unstable_cache } from 'next/cache';
import { fetchGitHubStats } from '@/lib/github';
import type { GitHubStats } from '@/lib/github';

const GITHUB_USERNAME = 'jorenverdad';

const getCachedStats = unstable_cache(
  async (): Promise<GitHubStats> => {
    return fetchGitHubStats(GITHUB_USERNAME);
  },
  ['github-stats'],
  {
    tags: ['github-stats'],
    revalidate: 3600,
  }
);

export async function GET() {
  const stats = await getCachedStats();

  return NextResponse.json(stats, {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
