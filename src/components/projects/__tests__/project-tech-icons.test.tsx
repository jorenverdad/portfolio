import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  resolveTechIcon,
  ProjectTechIcon,
  ShowcaseTechStack,
  DetailedTechStack,
  BaseUiIcon,
  ShadcnIcon,
} from "../project-tech-icons";

describe("project-tech-icons", () => {
  describe("resolveTechIcon", () => {
    it("resolves major framework and language tags to tech-stack-icons", () => {
      expect(resolveTechIcon("Next.js 16").iconName).toBe("nextjs2");
      expect(resolveTechIcon("React 19").iconName).toBe("react");
      expect(resolveTechIcon("Vue.js").iconName).toBe("vuejs");
      expect(resolveTechIcon("Vuetify").iconName).toBe("vuetify");
      expect(resolveTechIcon("Pinia").iconName).toBe("pinia");
      expect(resolveTechIcon("TypeScript").iconName).toBe("typescript");
      expect(resolveTechIcon("JavaScript").iconName).toBe("js");
      expect(resolveTechIcon("Tailwind CSS v4").iconName).toBe("tailwindcss");
      expect(resolveTechIcon("Supabase").iconName).toBe("supabase");
      expect(resolveTechIcon("PostgreSQL 16").iconName).toBe("postgresql");
      expect(resolveTechIcon("Docker").iconName).toBe("docker");
      expect(resolveTechIcon("pnpm").iconName).toBe("pnpm");
      expect(resolveTechIcon("Laravel").iconName).toBe("laravel");
      expect(resolveTechIcon("Figma").iconName).toBe("figma");
      expect(resolveTechIcon("Kotlin").iconName).toBe("kotlin");
      expect(resolveTechIcon("Android").iconName).toBe("android");
      expect(resolveTechIcon("Motion").iconName).toBe("motion");
      expect(resolveTechIcon("Manifest V3").iconName).toBe("chromium");
      expect(resolveTechIcon("Chromium").iconName).toBe("chromium");
      expect(resolveTechIcon("Vite").iconName).toBe("vitejs");
      expect(resolveTechIcon("Three.js").iconName).toBe("threejs");
      expect(resolveTechIcon("Radix UI").iconName).toBe("radixui");
      expect(resolveTechIcon("Bootstrap 5").iconName).toBe("bootstrap5");
      expect(resolveTechIcon("Capacitor").iconName).toBe("ionic");
      expect(resolveTechIcon("OpenAI API").iconName).toBe("openai");
      expect(resolveTechIcon("OpenAI").iconName).toBe("openai");
      expect(resolveTechIcon("Django REST Framework").iconName).toBe("django");
      expect(resolveTechIcon("Python").iconName).toBe("python");
      expect(resolveTechIcon("Electron").iconName).toBe("electron");
      expect(resolveTechIcon("Node.js").iconName).toBe("nodejs");
    });

    it("resolves custom and specialized tags with renderCustom", () => {
      expect(resolveTechIcon("Base UI").renderCustom).toBeDefined();
      expect(resolveTechIcon("Shadcn UI").renderCustom).toBeDefined();
      expect(resolveTechIcon("AI Moderation").renderCustom).toBeDefined();
      expect(resolveTechIcon("Groq AI").renderCustom).toBeDefined();
      expect(resolveTechIcon("REST API").renderCustom).toBeDefined();
      expect(resolveTechIcon("DOM MutationObserver").renderCustom).toBeDefined();
      expect(resolveTechIcon("Mobile UI").renderCustom).toBeDefined();
      expect(resolveTechIcon("Realtime").renderCustom).toBeDefined();
      expect(resolveTechIcon("Socket.io").renderCustom).toBeDefined();
      expect(resolveTechIcon("RPC Functions").renderCustom).toBeDefined();
      expect(resolveTechIcon("Crypto-JS").renderCustom).toBeDefined();
    });

    it("provides fallback for arbitrary tags", () => {
      const fallback = resolveTechIcon("Unknown Tech");
      expect(fallback.renderCustom).toBeDefined();
      expect(fallback.label).toBe("Unknown Tech");
    });
  });

  describe("BaseUiIcon and ShadcnIcon", () => {
    it("renders valid SVG without crashing", () => {
      const { container: baseContainer } = render(<BaseUiIcon className="size-6" />);
      const baseSvg = baseContainer.querySelector("svg");
      expect(baseSvg).toBeInTheDocument();
      expect(baseSvg).toHaveAttribute("viewBox", "0 0 17 24");

      const { container: shadcnContainer } = render(<ShadcnIcon className="size-6" />);
      const shadcnSvg = shadcnContainer.querySelector("svg");
      expect(shadcnSvg).toBeInTheDocument();
      expect(shadcnSvg).toHaveAttribute("viewBox", "0 0 256 256");
    });
  });

  describe("ProjectTechIcon", () => {
    it("renders StackIcon for standard tech", () => {
      const { container } = render(<ProjectTechIcon tag="React 19" isDark={true} />);
      expect(container.querySelector("svg")).toBeInTheDocument();
    });

    it("renders custom icon for Base UI", () => {
      const { container } = render(<ProjectTechIcon tag="Base UI" isDark={true} />);
      const svg = container.querySelector("svg");
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute("viewBox", "0 0 17 24");
    });

    it("renders custom icon for Shadcn UI", () => {
      const { container } = render(<ProjectTechIcon tag="Shadcn UI" isDark={true} />);
      const svg = container.querySelector("svg");
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute("viewBox", "0 0 256 256");
    });
  });

  describe("ShowcaseTechStack", () => {
    const sampleTags = [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Supabase",
      "PostgreSQL 16",
      "Docker",
      "Realtime",
    ];

    it("renders maxVisible items (default 6) and a +N badge when tags overflow", () => {
      render(<ShowcaseTechStack tags={sampleTags} maxVisible={6} />);

      // Exactly 6 visible items should have title/aria-label
      expect(screen.getByTitle("Next.js 16")).toBeInTheDocument();
      expect(screen.getByTitle("React 19")).toBeInTheDocument();
      expect(screen.getByTitle("TypeScript")).toBeInTheDocument();
      expect(screen.getByTitle("Supabase")).toBeInTheDocument();
      expect(screen.getByTitle("PostgreSQL 16")).toBeInTheDocument();
      expect(screen.getByTitle("Docker")).toBeInTheDocument();

      // +1 badge should be visible for Realtime
      expect(screen.getByText("+1")).toBeInTheDocument();
      expect(
        screen.getByLabelText("+1 more technologies: Realtime"),
      ).toBeInTheDocument();
    });

    it("does not render +N badge when tags <= maxVisible", () => {
      render(
        <ShowcaseTechStack
          tags={["React", "TypeScript", "Tailwind CSS", "Next.js", "Supabase", "PostgreSQL"]}
          maxVisible={6}
        />,
      );

      expect(screen.queryByText(/^\+\d+/)).not.toBeInTheDocument();
    });
  });

  describe("DetailedTechStack", () => {
    const sampleTags = [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Supabase",
      "PostgreSQL 16",
      "Docker",
      "Realtime",
    ];

    it("renders all technologies with their names and logos", () => {
      render(<DetailedTechStack tags={sampleTags} />);

      // All 7 items should be present with their full names
      sampleTags.forEach((tag) => {
        expect(screen.getByText(tag)).toBeInTheDocument();
      });

      // No +N badge should ever appear in detailed view
      expect(screen.queryByText(/^\+\d+/)).not.toBeInTheDocument();
    });
  });
});
