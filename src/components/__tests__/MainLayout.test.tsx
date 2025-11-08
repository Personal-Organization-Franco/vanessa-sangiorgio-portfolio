import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import MainLayout from "../MainLayout";

// Mock the Header component to avoid Gatsby Link dependencies
vi.mock("../Header", () => ({
  default: () => <div data-testid="header">Header</div>,
}));

describe("MainLayout", () => {
  it("renders without crashing", () => {
    render(
      <MainLayout>
        <div>Test content</div>
      </MainLayout>
    );
  });

  it("renders Header component", () => {
    render(
      <MainLayout>
        <div>Test content</div>
      </MainLayout>
    );
    expect(screen.getByTestId("header")).toBeInTheDocument();
  });

  it("renders Footer with correct copyright text", () => {
    render(
      <MainLayout>
        <div>Test content</div>
      </MainLayout>
    );
    const currentYear = new Date().getFullYear();
    expect(
      screen.getByText(`© Vanessa Sangiorgio ${currentYear} - London`)
    ).toBeInTheDocument();
  });

  it("renders children content correctly", () => {
    const testContent = "This is test content";
    render(
      <MainLayout>
        <div>{testContent}</div>
      </MainLayout>
    );
    expect(screen.getByText(testContent)).toBeInTheDocument();
  });

  it("has correct semantic HTML structure", () => {
    const { container } = render(
      <MainLayout>
        <div>Test content</div>
      </MainLayout>
    );

    const main = container.querySelector("main");
    const section = container.querySelector("section");
    const footer = container.querySelector("footer");

    expect(main).toBeInTheDocument();
    expect(section).toBeInTheDocument();
    expect(footer).toBeInTheDocument();
  });

  it("displays the current year dynamically", () => {
    render(
      <MainLayout>
        <div>Test content</div>
      </MainLayout>
    );
    const currentYear = new Date().getFullYear();
    const footer = screen.getByText(/Vanessa Sangiorgio/i);
    expect(footer.textContent).toContain(currentYear.toString());
  });
});
