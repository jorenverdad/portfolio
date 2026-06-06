import { NextResponse } from 'next/server';
import { cacheLife, cacheTag } from 'next/cache';
import { fetchGitHubStats } from '@/lib/github';
import type { GitHubStats } from '@/lib/github';

const GITHUB_USERNAME = 'jorenverdad';

/**
 * Cached data layer — `"use cache"` works here because the return
 * value is a plain object, not a NextResponse class instance.
 */
async function getCachedStats(): Promise<GitHubStats> {
  'use cache';
  cacheLife('hours');
  cacheTag('github-stats');

  return fetchGitHubStats(GITHUB_USERNAME);
}

export async function GET() {
  const stats = await getCachedStats();

  return NextResponse.json(stats, {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
