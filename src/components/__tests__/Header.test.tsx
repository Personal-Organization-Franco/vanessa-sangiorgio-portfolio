import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { navigate } from "gatsby";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Header from "../Header";

// Mock data for the header
const mockHeaderData = {
  logoText: "Vanessa Sangiorgio",
  navbar: [
    { name: "Work", to: "/" },
    { name: "About", to: "/about" },
  ],
};

// Mock the useHeaderData hook
vi.mock("hooks/useHeaderData", () => ({
  useHeaderData: vi.fn(() => mockHeaderData),
}));

describe("Header", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders logo and navigation links with correct destinations", () => {
    render(<Header />);

    expect(screen.getByText(mockHeaderData.logoText)).toBeInTheDocument();

    // Verify each nav link from mock data is rendered with correct destination
    for (const navItem of mockHeaderData.navbar) {
      const link = screen.getByRole("link", { name: navItem.name });
      expect(link).toHaveAttribute("href", navItem.to);
    }
  });

  it("clicking logo navigates to home page", async () => {
    const user = userEvent.setup();
    render(<Header />);

    await user.click(screen.getByText(mockHeaderData.logoText));

    expect(navigate).toHaveBeenCalledWith("/");
  });
});
