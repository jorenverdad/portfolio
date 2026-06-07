/**
 * GitHub GraphQL API — server-side data fetching with caching.
 *
 * Fetches public profile stats for a given GitHub user in a
 * **single GraphQL request** (replaces 30+ REST calls):
 * repos, followers, total stars earned, and all-time commit count.
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
        isFork: false
        privacy: PUBLIC
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
// Main fetcher — cached server function
// ---------------------------------------------------------------------------

const GITHUB_USERNAME = 'jorenverdad';

/**
 * Fetches aggregated GitHub statistics via a single GraphQL request.
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

    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query: GITHUB_STATS_QUERY,
        variables: { username },
      }),
    });

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

    return {
      publicRepos: user.publicRepos.totalCount,
      followers: user.followers.totalCount,
      totalStars,
      totalCommits: user.contributionsCollection.totalCommitContributions,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('[github] Failed to fetch stats:', error.message);
    }
    return fallback;
  }
}
