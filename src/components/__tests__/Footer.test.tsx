import Footer from "components/Footer";
import { render, screen } from "@testing-library/react";

describe("Footer", () => {
  it("renders Footer component", () => {
    render(<Footer>Some footer text</Footer>);
    expect(screen.getByText(/Footer/i)).toBeInTheDocument();
  });
});
