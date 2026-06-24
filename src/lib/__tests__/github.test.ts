import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { fetchGitHubStats } from "../github";

describe("github stats utility", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    // Setup clean env
    process.env = { ...originalEnv, GITHUB_TOKEN: "test-token-123" };
    // Stub console.error to keep test output clean
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.restoreAllMocks();
  });

  it("should successfully fetch and aggregate GitHub stats", async () => {
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

    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => mockGraphQLResponse,
    });

    vi.stubGlobal("fetch", mockFetch);

    const stats = await fetchGitHubStats("test-user");

    expect(stats).toEqual({
      publicRepos: 15,
      followers: 120,
      totalStars: 40, // 10 + 25 + 5
      totalCommits: 350,
    });

    expect(mockFetch).toHaveBeenCalledTimes(1);
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

    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => mockGraphQLResponse,
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

    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => mockGraphQLResponse,
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
