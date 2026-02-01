import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
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
  it("renders default title when no title prop is provided", () => {
    render(<SEO />);

    const titleElement = document.querySelector("title");
    expect(titleElement?.textContent).toBe("Vanessa Sangiorgio");
  });

  it("renders custom title appended to default title", () => {
    render(<SEO title="Work Page" />);

    const titleElement = document.querySelector("title");
    expect(titleElement?.textContent).toBe("Vanessa Sangiorgio - Work Page");
  });

  it("renders default description when no description prop is provided", () => {
    render(<SEO />);

    const metaDescription = document.querySelector('meta[name="description"]');
    expect(metaDescription?.getAttribute("content")).toBe(
      "Product Designer Portfolio"
    );
  });

  it("renders custom description when provided", () => {
    render(<SEO description="Custom page description" />);

    const metaDescription = document.querySelector('meta[name="description"]');
    expect(metaDescription?.getAttribute("content")).toBe(
      "Custom page description"
    );
  });

  it("renders both custom title and description", () => {
    render(<SEO title="About" description="Learn about Vanessa" />);

    const titleElement = document.querySelector("title");
    const metaDescription = document.querySelector('meta[name="description"]');

    expect(titleElement?.textContent).toBe("Vanessa Sangiorgio - About");
    expect(metaDescription?.getAttribute("content")).toBe(
      "Learn about Vanessa"
    );
  });

  it("renders children elements", () => {
    render(
      <SEO>
        <meta name="robots" content="index, follow" />
      </SEO>
    );

    const robotsMeta = document.querySelector('meta[name="robots"]');
    expect(robotsMeta?.getAttribute("content")).toBe("index, follow");
  });

  it("renders children alongside default meta tags", () => {
    render(
      <SEO title="Test">
        <meta property="og:type" content="website" />
      </SEO>
    );

    const titleElement = document.querySelector("title");
    const ogTypeMeta = document.querySelector('meta[property="og:type"]');
    const descriptionMeta = document.querySelector('meta[name="description"]');

    expect(titleElement?.textContent).toBe("Vanessa Sangiorgio - Test");
    expect(ogTypeMeta?.getAttribute("content")).toBe("website");
    expect(descriptionMeta).toBeInTheDocument();
  });
});
