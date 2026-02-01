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

  it("renders logo and navigation links with correct destinations", () => {
    render(<Header />);

    expect(screen.getByText("Vanessa Sangiorgio")).toBeInTheDocument();

    const workLink = screen.getByRole("link", { name: "Work" });
    const aboutLink = screen.getByRole("link", { name: "About" });

    expect(workLink).toHaveAttribute("href", "/");
    expect(aboutLink).toHaveAttribute("href", "/about");
  });

  it("clicking logo navigates to home page", async () => {
    const user = userEvent.setup();
    render(<Header />);

    await user.click(screen.getByText("Vanessa Sangiorgio"));

    expect(navigate).toHaveBeenCalledWith("/");
  });
});
