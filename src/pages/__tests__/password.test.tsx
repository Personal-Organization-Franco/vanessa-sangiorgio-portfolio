import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PasswordPage from "../password";

// Mock the utility functions
vi.mock("utils/setCookie", () => ({
  setCookie: vi.fn(),
}));

vi.mock("utils/isPasswordSet", () => ({
  isPasswordSet: vi.fn(() => false),
}));

// Mock MainLayout to simplify testing
vi.mock("components/MainLayout", () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="main-layout">{children}</div>
  ),
}));

import { setCookie } from "utils/setCookie";
import { isPasswordSet } from "utils/isPasswordSet";
import { navigate } from "gatsby";

describe("PasswordPage", () => {
  const mockLocation = {
    state: { from: "/case-studies/near-u" },
    pathname: "/password",
    search: "",
    hash: "",
    href: "",
    origin: "",
    protocol: "",
    host: "",
    hostname: "",
    port: "",
    key: "",
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(isPasswordSet).mockReturnValue(false);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders the password page with all essential elements", () => {
    render(<PasswordPage location={mockLocation as any} />);

    expect(
      screen.getByText("Please enter password to view this case study")
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /→/i })).toBeInTheDocument();
    expect(screen.getByText("Would you like the password?")).toBeInTheDocument();
    expect(screen.getByText("Request it here")).toBeInTheDocument();
  });

  it("has submit button disabled when input is empty", () => {
    render(<PasswordPage location={mockLocation as any} />);

    const submitButton = screen.getByRole("button");
    expect(submitButton).toBeDisabled();
  });

  it("enables submit button when user types in password field", async () => {
    const user = userEvent.setup();
    render(<PasswordPage location={mockLocation as any} />);

    const passwordInput = screen.getByLabelText("Password");
    await user.type(passwordInput, "somepassword");

    const submitButton = screen.getByRole("button");
    expect(submitButton).not.toBeDisabled();
  });

  it("shows error message when user submits wrong password", async () => {
    const user = userEvent.setup();
    // Set up environment variable for correct password
    vi.stubEnv("GATSBY_PASSWORD", "correctpassword");

    render(<PasswordPage location={mockLocation as any} />);

    const passwordInput = screen.getByLabelText("Password");
    await user.type(passwordInput, "wrongpassword");

    const submitButton = screen.getByRole("button");
    await user.click(submitButton);

    expect(screen.getByText(/Incorrect password/i)).toBeInTheDocument();
    expect(
      screen.getByText("vanessa.sangiorgio@yahoo.co.uk")
    ).toBeInTheDocument();

    vi.unstubAllEnvs();
  });

  it("clears error message when user clears the input", async () => {
    const user = userEvent.setup();
    vi.stubEnv("GATSBY_PASSWORD", "correctpassword");

    render(<PasswordPage location={mockLocation as any} />);

    const passwordInput = screen.getByLabelText("Password");

    // Type wrong password and submit
    await user.type(passwordInput, "wrongpassword");
    await user.click(screen.getByRole("button"));

    // Error should be visible
    expect(screen.getByText(/Incorrect password/i)).toBeInTheDocument();

    // Clear the input
    await user.clear(passwordInput);

    // Error should disappear
    expect(screen.queryByText(/Incorrect password/i)).not.toBeInTheDocument();

    vi.unstubAllEnvs();
  });

  it("sets cookie and navigates when user enters correct password", async () => {
    const user = userEvent.setup();
    vi.stubEnv("GATSBY_PASSWORD", "correctpassword");

    render(<PasswordPage location={mockLocation as any} />);

    const passwordInput = screen.getByLabelText("Password");
    await user.type(passwordInput, "correctpassword");
    await user.click(screen.getByRole("button"));

    expect(setCookie).toHaveBeenCalled();
    expect(navigate).toHaveBeenCalledWith("/case-studies/near-u");

    vi.unstubAllEnvs();
  });

  it("navigates to home when no referrer is provided", async () => {
    const user = userEvent.setup();
    vi.stubEnv("GATSBY_PASSWORD", "correctpassword");

    const locationWithoutState = {
      ...mockLocation,
      state: null,
    };

    render(<PasswordPage location={locationWithoutState as any} />);

    const passwordInput = screen.getByLabelText("Password");
    await user.type(passwordInput, "correctpassword");
    await user.click(screen.getByRole("button"));

    expect(navigate).toHaveBeenCalledWith("/");

    vi.unstubAllEnvs();
  });

  it("redirects immediately if password is already set", () => {
    vi.mocked(isPasswordSet).mockReturnValue(true);

    render(<PasswordPage location={mockLocation as any} />);

    expect(navigate).toHaveBeenCalledWith("/case-studies/near-u");
  });

  it("does not submit when pressing enter with empty input", async () => {
    const user = userEvent.setup();
    vi.stubEnv("GATSBY_PASSWORD", "correctpassword");

    render(<PasswordPage location={mockLocation as any} />);

    const passwordInput = screen.getByLabelText("Password");
    await user.click(passwordInput);
    await user.keyboard("{Enter}");

    expect(setCookie).not.toHaveBeenCalled();
    expect(navigate).not.toHaveBeenCalled();

    vi.unstubAllEnvs();
  });
});
