import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";
import Header from "../Header";

// Mock Gatsby navigate and Link
const mockNavigate = vi.fn();
vi.mock("gatsby", () => ({
  Link: ({ to, children, className }: any) => (
    <a href={to} className={className}>
      {children}
    </a>
  ),
  navigate: (...args: any[]) => mockNavigate(...args),
}));

// Mock useHeaderData hook
vi.mock("hooks/useHeaderData", () => ({
  useHeaderData: vi.fn(() => ({
    logoText: "Vanessa Sangiorgio",
    navbar: [
      { name: "About", to: "/about" },
      { name: "Work", to: "/work" },
    ],
  })),
}));

describe("Header", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it("renders without crashing", () => {
    render(<Header />);
  });

  it("renders logo text correctly", () => {
    render(<Header />);
    expect(screen.getByText("Vanessa Sangiorgio")).toBeInTheDocument();
  });

  it("renders navbar items correctly", () => {
    render(<Header />);
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Work")).toBeInTheDocument();
  });

  it("navbar links have correct href attributes", () => {
    render(<Header />);
    const aboutLink = screen.getByText("About").closest("a");
    const workLink = screen.getByText("Work").closest("a");

    expect(aboutLink).toHaveAttribute("href", "/about");
    expect(workLink).toHaveAttribute("href", "/work");
  });

  it("clicking logo triggers navigate to home", async () => {
    const user = userEvent.setup();
    render(<Header />);

    const logo = screen.getByText("Vanessa Sangiorgio");
    await user.click(logo);

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("has correct semantic HTML structure", () => {
    const { container } = render(<Header />);
    const header = container.querySelector("header");
    const nav = container.querySelector("nav");

    expect(header).toBeInTheDocument();
    expect(nav).toBeInTheDocument();
  });
});
