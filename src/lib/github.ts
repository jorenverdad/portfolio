/**
 * GitHub GraphQL & REST Search API — server-side data fetching with caching.
 *
 * Fetches profile stats for a given GitHub user:
 * repos, followers, total stars earned (across all owned repos, including forks and private repos),
 * and all-time commits (via GitHub Commit Search API, mirroring github-stats-extended,
 * with graceful fallback to GraphQL contributions).
 */

import { cacheLife, cacheTag } from 'next/cache';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface GitHubStats {
  readonly publicRepos: number;
  readonly followers: number;
  readonly totalStars: number;
  readonly totalCommits: number;
}

// ---------------------------------------------------------------------------
// GraphQL query
// ---------------------------------------------------------------------------

const GITHUB_STATS_QUERY = `
  query ($username: String!) {
    user(login: $username) {
      publicRepos: repositories(ownerAffiliations: OWNER, privacy: PUBLIC) {
        totalCount
      }
      followers {
        totalCount
      }
      repositories(
        first: 100
        ownerAffiliations: OWNER
        orderBy: { field: STARGAZERS, direction: DESC }
      ) {
        nodes {
          stargazerCount
        }
      }
      contributionsCollection {
        totalCommitContributions
      }
    }
  }
`;

// ---------------------------------------------------------------------------
// GraphQL response shape
// ---------------------------------------------------------------------------

interface GQLResponse {
  data?: {
    user?: {
      publicRepos: { totalCount: number };
      followers: { totalCount: number };
      repositories: {
        nodes: Array<{ stargazerCount: number }>;
      };
      contributionsCollection: {
        totalCommitContributions: number;
      };
    };
  };
  errors?: Array<{ message: string }>;
}

// ---------------------------------------------------------------------------
// Search API Helper — all-time commits
// ---------------------------------------------------------------------------

/**
 * Fetches all-time commit count by author using GitHub's Commit Search API.
 * This matches the exact commit counting logic of github-stats-extended (include_all_commits=true).
 * Returns null if the request fails or rate limits, allowing fallback to GraphQL contributions.
 */
async function fetchAllTimeCommits(
  username: string,
  token?: string,
): Promise<number | null> {
  try {
    const headers: Record<string, string> = {
      Accept: 'application/vnd.github.cloak-preview',
      'User-Agent': 'portfolio-app',
    };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const res = await fetch(
      `https://api.github.com/search/commits?q=author:${encodeURIComponent(username)}`,
      {
        headers,
      },
    );

    if (!res.ok) {
      console.warn(`[github] Commit search HTTP ${res.status}`);
      return null;
    }

    const data: { total_count?: number } = await res.json();
    if (typeof data.total_count === 'number' && !Number.isNaN(data.total_count)) {
      return data.total_count;
    }
    return null;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.warn('[github] Commit search failed:', error.message);
    }
    return null;
  }
}

// ---------------------------------------------------------------------------
// Main fetcher — cached server function
// ---------------------------------------------------------------------------

const GITHUB_USERNAME = 'jorenverdad';

/**
 * Fetches aggregated GitHub statistics.
 *
 * Cached for 1 hour via `use cache` + `cacheLife('hours')`.
 * Call this directly from Server Components — no API route needed.
 */
export async function fetchGitHubStats(
  username: string = GITHUB_USERNAME,
): Promise<GitHubStats> {
  'use cache';
  cacheLife('hours');
  cacheTag('github-stats');

  const fallback: GitHubStats = {
    publicRepos: 0,
    followers: 0,
    totalStars: 0,
    totalCommits: 0,
  };

  try {
    const token = process.env.GITHUB_TOKEN;

    const gqlHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (token) {
      gqlHeaders.Authorization = `Bearer ${token}`;
    }

    const [res, allTimeCommits] = await Promise.all([
      fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: gqlHeaders,
        body: JSON.stringify({
          query: GITHUB_STATS_QUERY,
          variables: { username },
        }),
      }),
      fetchAllTimeCommits(username, token),
    ]);

    if (!res.ok) {
      console.error(`[github] GraphQL HTTP ${res.status}`);
      return fallback;
    }

    const json: GQLResponse = await res.json();

    if (json.errors?.length) {
      console.error('[github] GraphQL errors:', json.errors);
      return fallback;
    }

    const user = json.data?.user;
    if (!user) {
      console.error('[github] User not found');
      return fallback;
    }

    const totalStars = user.repositories.nodes.reduce(
      (sum, repo) => sum + repo.stargazerCount,
      0,
    );

    const totalCommits =
      allTimeCommits !== null
        ? allTimeCommits
        : user.contributionsCollection.totalCommitContributions;

    return {
      publicRepos: user.publicRepos.totalCount,
      followers: user.followers.totalCount,
      totalStars,
      totalCommits,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('[github] Failed to fetch stats:', error.message);
    }
    return fallback;
  }
}
