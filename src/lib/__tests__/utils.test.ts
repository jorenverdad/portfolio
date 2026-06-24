import { describe, it, expect } from "vitest";
import { cn } from "../utils";

describe("cn utility", () => {
  it("should merge class names", () => {
    expect(cn("class1", "class2")).toBe("class1 class2");
  });

  it("should handle conditional class names", () => {
    expect(cn("class1", true && "class2", false && "class3")).toBe("class1 class2");
  });

  it("should resolve Tailwind class conflicts", () => {
    expect(cn("py-2 px-2", "px-4")).toBe("py-2 px-4");
  });

  it("should handle empty or undefined inputs", () => {
    expect(cn(undefined, null, "")).toBe("");
  });
});
