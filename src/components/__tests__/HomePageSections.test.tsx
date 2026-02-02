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

    // Verify each project from mock data is rendered
    for (const section of mockSections) {
      expect(screen.getByText(section.projectTitle)).toBeInTheDocument();
      expect(screen.getByText(section.projectRole)).toBeInTheDocument();
      expect(
        screen.getByText(section.projectDescription.projectDescription),
      ).toBeInTheDocument();
    }
  });

  it("navigates to case study when clicking on a project section", async () => {
    const user = userEvent.setup();
    render(<HomePageSections />);

    const firstProject = mockSections[0];
    const projectTitle = screen.getByText(firstProject.projectTitle);
    const section = projectTitle.closest("section");
    await user.click(section!);

    expect(navigate).toHaveBeenCalledWith(firstProject.projectPath);
  });

  it("navigates to case study when clicking Read More", async () => {
    const user = userEvent.setup();
    render(<HomePageSections />);

    const secondProject = mockSections[1];
    // Find "Read More" text elements and click the one for the second project
    const readMoreElements = screen.getAllByText(/^Read More$/);
    await user.click(readMoreElements[1]);

    expect(navigate).toHaveBeenCalledWith(secondProject.projectPath);
  });

  it("displays project images with correct alt text", () => {
    render(<HomePageSections />);

    // Verify each project image uses the section name as alt text
    for (const section of mockSections) {
      expect(screen.getByAltText(section.sectionName)).toBeInTheDocument();
    }
  });
});
