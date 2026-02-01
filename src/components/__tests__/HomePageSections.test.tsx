import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { navigate } from "gatsby";
import { beforeEach, describe, expect, it, vi } from "vitest";
import HomePageSections from "../HomePageSections";

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

  it("renders all projects with their role, title, and description", () => {
    render(<HomePageSections />);

    expect(screen.getByText("Near-U")).toBeInTheDocument();
    expect(screen.getByText("Product Designer")).toBeInTheDocument();
    expect(
      screen.getByText("A dating app focused on meaningful connections."),
    ).toBeInTheDocument();

    expect(screen.getByText("GWR Rewards")).toBeInTheDocument();
    expect(screen.getByText("UX Designer")).toBeInTheDocument();
    expect(
      screen.getByText("A rewards program for train passengers."),
    ).toBeInTheDocument();
  });

  it("navigates to case study when clicking on a project section", async () => {
    const user = userEvent.setup();
    render(<HomePageSections />);

    const nearUTitle = screen.getByText("Near-U");
    const section = nearUTitle.closest('[role="button"]');
    await user.click(section!);

    expect(navigate).toHaveBeenCalledWith("/case-studies/near-u");
  });

  it("navigates to case study when clicking Read More", async () => {
    const user = userEvent.setup();
    render(<HomePageSections />);

    const readMoreLinks = screen.getAllByText("Read More");
    await user.click(readMoreLinks[1]);

    expect(navigate).toHaveBeenCalledWith("/case-studies/gwr-rewards");
  });

  it("displays project images with correct alt text", () => {
    render(<HomePageSections />);

    expect(screen.getByAltText("Near-U")).toBeInTheDocument();
    expect(screen.getByAltText("GWR Rewards")).toBeInTheDocument();
  });
});
