/**
 * GitHub API types and server-side data fetching utilities.
 *
 * Fetches public profile stats for a given GitHub user:
 * repos, followers, total stars earned, and all-time commit count.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface GitHubStats {
  readonly publicRepos: number;
  readonly followers: number;
  readonly totalStars: number;
  readonly totalCommits: number;
}

/** Minimal shape returned by GET /users/:username */
interface GitHubUserResponse {
  readonly public_repos: number;
  readonly followers: number;
}

/** Minimal shape returned by GET /users/:username/repos */
interface GitHubRepoResponse {
  readonly name: string;
  readonly fork: boolean;
  readonly stargazers_count: number;
}

/** Shape of a single contributor entry from the contributors endpoint */
interface GitHubContributorResponse {
  readonly login: string;
  readonly contributions: number;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function headers(): HeadersInit {
  const h: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };

  const token = process.env.GITHUB_TOKEN;
  if (token) {
    h.Authorization = `Bearer ${token}`;
  }

  return h;
}

async function ghFetch<T>(url: string): Promise<T> {
  const res = await fetch(url, { headers: headers(), cache: 'no-store' });
  if (!res.ok) {
    throw new Error(`GitHub API ${res.status}: ${url}`);
  }
  return res.json() as Promise<T>;
}

/**
 * Fetches all pages for a paginated GitHub endpoint.
 * Returns a flat array of all items across every page.
 */
async function ghFetchAllPages<T>(baseUrl: string, perPage = 100): Promise<T[]> {
  const results: T[] = [];
  let page = 1;
  const maxPages = 10; // safety cap

  while (page <= maxPages) {
    const separator = baseUrl.includes('?') ? '&' : '?';
    const url = `${baseUrl}${separator}per_page=${perPage}&page=${page}`;
    const items = await ghFetch<T[]>(url);
    results.push(...items);

    if (items.length < perPage) break;
    page++;
  }

  return results;
}

// ---------------------------------------------------------------------------
// Main fetcher
// ---------------------------------------------------------------------------

/**
 * Fetches aggregated GitHub statistics for a user.
 *
 * - `publicRepos` and `followers` come from the user profile endpoint.
 * - `totalStars` is summed across all non-fork public repositories.
 * - `totalCommits` is summed from the contributors endpoint of each repo.
 *
 * Individual endpoint failures are swallowed and default to 0 so the
 * card always renders *something*.
 */
export async function fetchGitHubStats(username: string): Promise<GitHubStats> {
  let publicRepos = 0;
  let followers = 0;
  let totalStars = 0;
  let totalCommits = 0;

  try {
    // ── 1. User profile ────────────────────────────────────────────────
    const user = await ghFetch<GitHubUserResponse>(
      `https://api.github.com/users/${username}`,
    );
    publicRepos = user.public_repos;
    followers = user.followers;

    // ── 2. All public repos (paginated) ────────────────────────────────
    const repos = await ghFetchAllPages<GitHubRepoResponse>(
      `https://api.github.com/users/${username}/repos?type=owner`,
    );

    // ── 3. Stars — sum across non-fork repos ───────────────────────────
    totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);

    // ── 4. Commits — sum contributor stats per repo ────────────────────
    //    We run requests in parallel batches to stay within rate limits.
    const BATCH_SIZE = 10;
    const ownRepos = repos.filter((r) => !r.fork);

    for (let i = 0; i < ownRepos.length; i += BATCH_SIZE) {
      const batch = ownRepos.slice(i, i + BATCH_SIZE);
      const results = await Promise.allSettled(
        batch.map((repo) =>
          ghFetchAllPages<GitHubContributorResponse>(
            `https://api.github.com/repos/${username}/${repo.name}/contributors`,
          ),
        ),
      );

      for (const result of results) {
        if (result.status === 'fulfilled') {
          const userContrib = result.value.find(
            (c) => c.login.toLowerCase() === username.toLowerCase(),
          );
          if (userContrib) {
            totalCommits += userContrib.contributions;
          }
        }
        // Rejected promises are silently skipped — partial data > no data.
      }
    }
  } catch (error: unknown) {
    // Top-level failure (e.g. user endpoint down). Return whatever we have.
    if (error instanceof Error) {
      console.error('[github] Failed to fetch stats:', error.message);
    }
  }

  return { publicRepos, followers, totalStars, totalCommits };
}
