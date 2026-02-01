import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HomePageSections from "../HomePageSections";
import { navigate } from "gatsby";

const mockSections = [
  {
    projectRole: "Product Designer",
    projectTitle: "Near-U",
    projectDescription: {
      projectDescription: "A dating app focused on meaningful connections.",
    },
    projectImage: {
      gatsbyImageData: { mock: "imageData" },
      file: {
        contentType: "image/png",
        url: "https://example.com/near-u.png",
      },
    },
    sectionName: "Near-U",
    projectPath: "/case-studies/near-u",
  },
  {
    projectRole: "UX Designer",
    projectTitle: "GWR Rewards",
    projectDescription: {
      projectDescription: "A rewards program for train passengers.",
    },
    projectImage: {
      gatsbyImageData: { mock: "imageData" },
      file: {
        contentType: "image/gif",
        url: "https://example.com/gwr.gif",
      },
    },
    sectionName: "GWR Rewards",
    projectPath: "/case-studies/gwr-rewards",
  },
];

// Mock the useHomePageSections hook
vi.mock("hooks/useHomePageSections", () => ({
  useHomePageSections: vi.fn(() => mockSections),
}));

describe("HomePageSections", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all project sections", () => {
    render(<HomePageSections />);

    expect(screen.getByText("Near-U")).toBeInTheDocument();
    expect(screen.getByText("GWR Rewards")).toBeInTheDocument();
  });

  it("displays project roles for each section", () => {
    render(<HomePageSections />);

    expect(screen.getByText("Product Designer")).toBeInTheDocument();
    expect(screen.getByText("UX Designer")).toBeInTheDocument();
  });

  it("displays project descriptions", () => {
    render(<HomePageSections />);

    expect(
      screen.getByText("A dating app focused on meaningful connections.")
    ).toBeInTheDocument();
    expect(
      screen.getByText("A rewards program for train passengers.")
    ).toBeInTheDocument();
  });

  it("renders Read More links for each project", () => {
    render(<HomePageSections />);

    const readMoreLinks = screen.getAllByText("Read More");
    expect(readMoreLinks).toHaveLength(2);
  });

  it("navigates to project case study when clicking on project card", async () => {
    const user = userEvent.setup();
    render(<HomePageSections />);

    const nearUTitle = screen.getByText("Near-U");
    const section = nearUTitle.closest("section");
    await user.click(section!);

    expect(navigate).toHaveBeenCalledWith("/case-studies/near-u");
  });

  it("navigates to project case study when clicking Read More", async () => {
    const user = userEvent.setup();
    render(<HomePageSections />);

    const readMoreLinks = screen.getAllByText("Read More");
    await user.click(readMoreLinks[0]);

    expect(navigate).toHaveBeenCalledWith("/case-studies/near-u");
  });

  it("renders GIF images as regular img tags", () => {
    render(<HomePageSections />);

    // GWR Rewards has a GIF image
    const gifImage = screen.getByAltText("GWR Rewards");
    expect(gifImage.tagName).toBe("IMG");
    expect(gifImage).toHaveAttribute("src", "https://example.com/gwr.gif");
  });

  it("renders non-GIF images as GatsbyImage", () => {
    render(<HomePageSections />);

    // Near-U has a PNG image, which should be rendered as GatsbyImage
    const gatsbyImages = screen.getAllByTestId("gatsby-image");
    expect(gatsbyImages.length).toBeGreaterThan(0);
  });

  it("each project section has cursor-pointer class", () => {
    render(<HomePageSections />);

    const nearUTitle = screen.getByText("Near-U");
    const section = nearUTitle.closest("section");

    expect(section).toHaveClass("cursor-pointer");
  });

  it("renders article container with grid layout", () => {
    render(<HomePageSections />);

    const article = screen.getByRole("article");
    expect(article).toHaveClass("grid");
  });
});
