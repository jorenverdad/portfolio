import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { fetchGitHubStats } from "../github";

describe("github stats utility", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    // Setup clean env
    process.env = { ...originalEnv, GITHUB_TOKEN: "test-token-123" };
    // Stub console.error and console.warn to keep test output clean
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.spyOn(console, "warn").mockImplementation(() => {});
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.restoreAllMocks();
  });

  it("should successfully fetch and aggregate GitHub stats using Search API for commits", async () => {
    const mockGraphQLResponse = {
      data: {
        user: {
          publicRepos: { totalCount: 15 },
          followers: { totalCount: 120 },
          repositories: {
            nodes: [
              { stargazerCount: 10 },
              { stargazerCount: 25 },
              { stargazerCount: 5 },
            ],
          },
          contributionsCollection: {
            totalCommitContributions: 350,
          },
        },
      },
    };

    const mockFetch = vi.fn().mockImplementation(async (url: string) => {
      if (url.includes("/graphql")) {
        return {
          ok: true,
          status: 200,
          json: async () => mockGraphQLResponse,
        };
      }
      if (url.includes("/search/commits")) {
        return {
          ok: true,
          status: 200,
          json: async () => ({ total_count: 588 }),
        };
      }
      return { ok: false, status: 404 };
    });

    vi.stubGlobal("fetch", mockFetch);

    const stats = await fetchGitHubStats("test-user");

    expect(stats).toEqual({
      publicRepos: 15,
      followers: 120,
      totalStars: 40, // 10 + 25 + 5
      totalCommits: 588,
    });

    expect(mockFetch).toHaveBeenCalledTimes(2);
    expect(mockFetch).toHaveBeenCalledWith(
      "https://api.github.com/graphql",
      expect.objectContaining({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer test-token-123",
        },
        body: expect.stringContaining('"username":"test-user"'),
      })
    );
    expect(mockFetch).toHaveBeenCalledWith(
      "https://api.github.com/search/commits?q=author:test-user",
      expect.objectContaining({
        headers: {
          Accept: "application/vnd.github.cloak-preview",
          "User-Agent": "portfolio-app",
          Authorization: "Bearer test-token-123",
        },
      })
    );
  });

  it("should fall back to GraphQL contributions count when Commit Search API fails", async () => {
    const mockGraphQLResponse = {
      data: {
        user: {
          publicRepos: { totalCount: 15 },
          followers: { totalCount: 120 },
          repositories: {
            nodes: [
              { stargazerCount: 10 },
              { stargazerCount: 25 },
              { stargazerCount: 5 },
            ],
          },
          contributionsCollection: {
            totalCommitContributions: 350,
          },
        },
      },
    };

    const mockFetch = vi.fn().mockImplementation(async (url: string) => {
      if (url.includes("/graphql")) {
        return {
          ok: true,
          status: 200,
          json: async () => mockGraphQLResponse,
        };
      }
      if (url.includes("/search/commits")) {
        return {
          ok: false,
          status: 403,
          json: async () => ({ message: "rate limited" }),
        };
      }
      return { ok: false, status: 404 };
    });

    vi.stubGlobal("fetch", mockFetch);

    const stats = await fetchGitHubStats("test-user");

    expect(stats).toEqual({
      publicRepos: 15,
      followers: 120,
      totalStars: 40,
      totalCommits: 350, // gracefully falls back to totalCommitContributions
    });
  });

  it("should return fallback stats and log error on HTTP failure status", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
    });

    vi.stubGlobal("fetch", mockFetch);

    const stats = await fetchGitHubStats("test-user");

    expect(stats).toEqual({
      publicRepos: 0,
      followers: 0,
      totalStars: 0,
      totalCommits: 0,
    });

    expect(console.error).toHaveBeenCalledWith(
      expect.stringContaining("[github] GraphQL HTTP 500")
    );
  });

  it("should return fallback stats when GraphQL response contains errors", async () => {
    const mockGraphQLResponse = {
      errors: [{ message: "Field not found" }],
    };

    const mockFetch = vi.fn().mockImplementation(async (url: string) => {
      if (url.includes("/graphql")) {
        return {
          ok: true,
          status: 200,
          json: async () => mockGraphQLResponse,
        };
      }
      return {
        ok: true,
        status: 200,
        json: async () => ({ total_count: 100 }),
      };
    });

    vi.stubGlobal("fetch", mockFetch);

    const stats = await fetchGitHubStats("test-user");

    expect(stats).toEqual({
      publicRepos: 0,
      followers: 0,
      totalStars: 0,
      totalCommits: 0,
    });

    expect(console.error).toHaveBeenCalledWith(
      "[github] GraphQL errors:",
      mockGraphQLResponse.errors
    );
  });

  it("should return fallback stats when user data is missing in response", async () => {
    const mockGraphQLResponse = {
      data: {
        user: null,
      },
    };

    const mockFetch = vi.fn().mockImplementation(async (url: string) => {
      if (url.includes("/graphql")) {
        return {
          ok: true,
          status: 200,
          json: async () => mockGraphQLResponse,
        };
      }
      return {
        ok: true,
        status: 200,
        json: async () => ({ total_count: 100 }),
      };
    });

    vi.stubGlobal("fetch", mockFetch);

    const stats = await fetchGitHubStats("test-user");

    expect(stats).toEqual({
      publicRepos: 0,
      followers: 0,
      totalStars: 0,
      totalCommits: 0,
    });

    expect(console.error).toHaveBeenCalledWith(
      expect.stringContaining("[github] User not found")
    );
  });

  it("should handle network-level fetch rejections and return fallback stats", async () => {
    const mockFetch = vi.fn().mockRejectedValue(new Error("DNS Resolution Failed"));

    vi.stubGlobal("fetch", mockFetch);

    const stats = await fetchGitHubStats("test-user");

    expect(stats).toEqual({
      publicRepos: 0,
      followers: 0,
      totalStars: 0,
      totalCommits: 0,
    });

    expect(console.error).toHaveBeenCalledWith(
      "[github] Failed to fetch stats:",
      "DNS Resolution Failed"
    );
  });
});
