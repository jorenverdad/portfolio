import { describe, it, expect } from "vitest";
import {
  getAllProjects,
  getProjectById,
  getAllCategories,
  PROJECTS_ARCHIVE,
} from "../projects-data";

describe("projects-data", () => {
  it("returns all projects in the archive", () => {
    const projects = getAllProjects();
    expect(projects.length).toBeGreaterThanOrEqual(8);
    expect(projects).toEqual(PROJECTS_ARCHIVE);
  });

  it("ensures every project has a unique ID, role, and non-empty contributions", () => {
    const ids = new Set<string>();
    PROJECTS_ARCHIVE.forEach((p) => {
      expect(ids.has(p.id)).toBe(false);
      ids.add(p.id);
      expect(p.title.trim().length).toBeGreaterThan(0);
      expect(p.subtitle.trim().length).toBeGreaterThan(0);
      expect(p.role.trim().length).toBeGreaterThan(0);
      expect(p.team.trim().length).toBeGreaterThan(0);
      expect(p.details.overview.trim().length).toBeGreaterThan(0);
      expect(p.details.problem.trim().length).toBeGreaterThan(0);
      expect(p.details.solution.trim().length).toBeGreaterThan(0);
      expect(p.details.myContributions.length).toBeGreaterThan(0);
      expect(p.tags.length).toBeGreaterThan(0);
    });
  });

  it("finds a project by ID accurately", () => {
    const proj1 = getProjectById("proj-1");
    expect(proj1).toBeDefined();
    expect(proj1?.title).toBe("JoSan Website");

    const proj9 = getProjectById("proj-9");
    expect(proj9).toBeDefined();
    expect(proj9?.title).toBe("ChattingHub");
    expect(proj9?.category).toBe("Full-stack Web App");

    const proj10 = getProjectById("proj-10");
    expect(proj10).toBeDefined();
    expect(proj10?.title).toBe("Sinawali Showdown");
    expect(proj10?.category).toBe("Desktop App");
    expect(proj10?.images?.length).toBe(5);

    const nonExistent = getProjectById("non-existent-id");
    expect(nonExistent).toBeUndefined();
  });

  it("provides valid categories including 'All'", () => {
    const categories = getAllCategories();
    expect(categories).toContain("All");
    expect(categories).toContain("Full-stack Web App");
    expect(categories).toContain("Frontend Web App");
    expect(categories).toContain("Chromium Web Extension");
    expect(categories).toContain("Mobile App");
    expect(categories).toContain("Desktop App");
  });
});
