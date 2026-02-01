import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import SEO from "../SEO";

// Mock the useSiteMetadata hook
vi.mock("hooks/useSiteMetaData", () => ({
  useSiteMetadata: vi.fn(() => ({
    title: "Vanessa Sangiorgio",
    description: "Product Designer Portfolio",
    siteUrl: "https://vanessasangiorgio.com",
  })),
}));

describe("SEO", () => {
  it("renders default title and description when no props provided", () => {
    render(<SEO />);

    expect(document.querySelector("title")?.textContent).toBe(
      "Vanessa Sangiorgio",
    );
    expect(
      document
        .querySelector('meta[name="description"]')
        ?.getAttribute("content"),
    ).toBe("Product Designer Portfolio");
  });

  it("renders custom title appended to site name", () => {
    render(<SEO title="Work Page" />);

    expect(document.querySelector("title")?.textContent).toBe(
      "Vanessa Sangiorgio - Work Page",
    );
  });

  it("renders custom description when provided", () => {
    render(<SEO description="Custom page description" />);

    expect(
      document
        .querySelector('meta[name="description"]')
        ?.getAttribute("content"),
    ).toBe("Custom page description");
  });

  it("renders children elements in the head", () => {
    render(
      <SEO>
        <meta name="robots" content="index, follow" />
      </SEO>,
    );

    expect(
      document.querySelector('meta[name="robots"]')?.getAttribute("content"),
    ).toBe("index, follow");
  });
});
