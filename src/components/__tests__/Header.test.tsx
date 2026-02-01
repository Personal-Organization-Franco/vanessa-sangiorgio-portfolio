import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Header from "../Header";
import { navigate } from "gatsby";

// Mock the useHeaderData hook
vi.mock("hooks/useHeaderData", () => ({
  useHeaderData: vi.fn(() => ({
    logoText: "Vanessa Sangiorgio",
    navbar: [
      { name: "Work", to: "/" },
      { name: "About", to: "/about" },
    ],
  })),
}));

describe("Header", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the logo text", () => {
    render(<Header />);

    expect(screen.getByText("Vanessa Sangiorgio")).toBeInTheDocument();
  });

  it("renders all navigation items", () => {
    render(<Header />);

    expect(screen.getByRole("link", { name: "Work" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "About" })).toBeInTheDocument();
  });

  it("navigation links have correct href attributes", () => {
    render(<Header />);

    const workLink = screen.getByRole("link", { name: "Work" });
    const aboutLink = screen.getByRole("link", { name: "About" });

    expect(workLink).toHaveAttribute("href", "/");
    expect(aboutLink).toHaveAttribute("href", "/about");
  });

  it("clicking logo navigates to home page", async () => {
    const user = userEvent.setup();
    render(<Header />);

    const logo = screen.getByText("Vanessa Sangiorgio");
    await user.click(logo);

    expect(navigate).toHaveBeenCalledWith("/");
  });

  it("logo has cursor-pointer class for clickability indication", () => {
    render(<Header />);

    const logo = screen.getByText("Vanessa Sangiorgio");
    expect(logo).toHaveClass("cursor-pointer");
  });

  it("renders header element with correct structure", () => {
    render(<Header />);

    const header = screen.getByRole("banner");
    const nav = screen.getByRole("navigation");

    expect(header).toBeInTheDocument();
    expect(nav).toBeInTheDocument();
  });
});
