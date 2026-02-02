import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import SEO from "../SEO";

// Mock data for site metadata
const mockSiteMetadata = {
  title: "Vanessa Sangiorgio",
  description: "Product Designer Portfolio",
  siteUrl: "https://vanessasangiorgio.com",
};

// Mock the useSiteMetadata hook
vi.mock("hooks/useSiteMetaData", () => ({
  useSiteMetadata: vi.fn(() => mockSiteMetadata),
}));

describe("SEO", () => {
  it("renders default title and description when no props provided", () => {
    render(<SEO />);

    expect(document.querySelector("title")?.textContent).toBe(
      mockSiteMetadata.title,
    );
    expect(
      document
        .querySelector('meta[name="description"]')
        ?.getAttribute("content"),
    ).toBe(mockSiteMetadata.description);
  });

  it("renders custom title appended to site name", () => {
    const customTitle = "Work Page";
    render(<SEO title={customTitle} />);

    expect(document.querySelector("title")?.textContent).toBe(
      `${mockSiteMetadata.title} - ${customTitle}`,
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
