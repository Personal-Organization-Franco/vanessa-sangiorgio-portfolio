import { render, screen } from "@testing-library/react";
import Footer from "../Footer";

describe("Footer", () => {
  it("renders without crashing", () => {
    render(<Footer>Test content</Footer>);
  });

  it("renders children content correctly", () => {
    const testContent = "© 2025 - Test Footer Content";
    render(<Footer>{testContent}</Footer>);
    expect(screen.getByText(testContent)).toBeInTheDocument();
  });

  it("has correct semantic HTML structure", () => {
    const { container } = render(<Footer>Test content</Footer>);
    const footer = container.querySelector("footer");
    expect(footer).toBeInTheDocument();
  });

  it("renders multiple children elements", () => {
    render(
      <Footer>
        <span>Copyright 2025</span>
        <span>All rights reserved</span>
      </Footer>
    );
    expect(screen.getByText("Copyright 2025")).toBeInTheDocument();
    expect(screen.getByText("All rights reserved")).toBeInTheDocument();
  });
});
