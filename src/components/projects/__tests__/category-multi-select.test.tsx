import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  CategoryMultiSelect,
  ActiveCategoryChips,
} from "../category-multi-select";
import type { ProjectCategory } from "@/lib/projects-data";

describe("CategoryMultiSelect", () => {
  const allCategories: ReadonlyArray<ProjectCategory> = [
    "All",
    "Full-stack Web App",
    "Frontend Web App",
    "Chromium Web Extension",
    "Mobile App",
    "Cross-Platform App",
    "Machine Learning",
  ];

  const categoryCounts = {
    All: 11,
    "Full-stack Web App": 5,
    "Frontend Web App": 2,
    "Chromium Web Extension": 1,
    "Mobile App": 1,
    "Cross-Platform App": 1,
    "Machine Learning": 1,
  };

  it("renders trigger with 'All Categories' when no categories selected", () => {
    render(
      <CategoryMultiSelect
        allCategories={allCategories}
        selectedCategories={[]}
        categoryCounts={categoryCounts}
        onToggleCategory={vi.fn()}
        onSelectAll={vi.fn()}
        onClearAll={vi.fn()}
      />,
    );

    expect(screen.getByText("All Categories")).toBeInTheDocument();
  });

  it("renders count badge and name when specific categories are selected", () => {
    render(
      <CategoryMultiSelect
        allCategories={allCategories}
        selectedCategories={["Machine Learning", "Mobile App"]}
        categoryCounts={categoryCounts}
        onToggleCategory={vi.fn()}
        onSelectAll={vi.fn()}
        onClearAll={vi.fn()}
      />,
    );

    expect(screen.getByText("Categories (2)")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("opens popover and triggers onToggleCategory when an option is clicked", () => {
    const onToggle = vi.fn();
    render(
      <CategoryMultiSelect
        allCategories={allCategories}
        selectedCategories={[]}
        categoryCounts={categoryCounts}
        onToggleCategory={onToggle}
        onSelectAll={vi.fn()}
        onClearAll={vi.fn()}
      />,
    );

    const trigger = screen.getByRole("button", { name: /filter by category/i });
    fireEvent.click(trigger);

    const mlOption = screen.getByRole("checkbox", { name: /machine learning/i });
    expect(mlOption).toBeInTheDocument();
    fireEvent.click(mlOption);

    expect(onToggle).toHaveBeenCalledWith("Machine Learning");
  });

  it("triggers onSelectAll and onClearAll actions", () => {
    const onSelectAll = vi.fn();
    const onClearAll = vi.fn();

    render(
      <CategoryMultiSelect
        allCategories={allCategories}
        selectedCategories={["Machine Learning"]}
        categoryCounts={categoryCounts}
        onToggleCategory={vi.fn()}
        onSelectAll={onSelectAll}
        onClearAll={onClearAll}
      />,
    );

    const trigger = screen.getByRole("button", { name: /filter by category/i });
    fireEvent.click(trigger);

    const resetBtn = screen.getByRole("button", { name: /reset/i });
    fireEvent.click(resetBtn);
    expect(onClearAll).toHaveBeenCalled();

    const selectAllBtn = screen.getByRole("button", { name: /select all/i });
    fireEvent.click(selectAllBtn);
    expect(onSelectAll).toHaveBeenCalled();
  });
});

describe("ActiveCategoryChips", () => {
  it("renders nothing when no categories are selected", () => {
    const { container } = render(
      <ActiveCategoryChips
        selectedCategories={[]}
        onRemoveCategory={vi.fn()}
        onClearAll={vi.fn()}
      />,
    );

    expect(container.firstChild).toBeNull();
  });

  it("renders chips and triggers removal and clear-all callbacks", () => {
    const onRemove = vi.fn();
    const onClear = vi.fn();

    render(
      <ActiveCategoryChips
        selectedCategories={["Machine Learning", "Mobile App"]}
        onRemoveCategory={onRemove}
        onClearAll={onClear}
      />,
    );

    expect(screen.getByText("Machine Learning")).toBeInTheDocument();
    expect(screen.getByText("Mobile App")).toBeInTheDocument();

    const removeMl = screen.getByLabelText("Remove Machine Learning filter");
    fireEvent.click(removeMl);
    expect(onRemove).toHaveBeenCalledWith("Machine Learning");

    const clearAll = screen.getByText("Clear all");
    fireEvent.click(clearAll);
    expect(onClear).toHaveBeenCalled();
  });
});
