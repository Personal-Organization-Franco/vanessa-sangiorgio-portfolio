import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
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

import { navigate } from "gatsby";
import { isPasswordSet } from "utils/isPasswordSet";
import { setCookie } from "utils/setCookie";

type MockLocation = {
  state: { from?: string } | null;
  pathname: string;
  search: string;
  hash: string;
  href: string;
  origin: string;
  protocol: string;
  host: string;
  hostname: string;
  port: string;
  key: string;
};

function createMockLocation(
  overrides: Partial<MockLocation> = {},
): MockLocation {
  return {
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
    ...overrides,
  };
}

describe("PasswordPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(isPasswordSet).mockReturnValue(false);
  });

  it("renders the password form with essential elements", () => {
    render(<PasswordPage location={createMockLocation()} />);

    // Check for key structural elements, using partial matching for copy that may change
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
    // Verify there's a contact link with mailto (email address may change)
    expect(
      screen.getByRole("link", { name: /request/i }),
    ).toHaveAttribute("href", expect.stringContaining("mailto:"));
  });

  it("submit button is disabled until user enters text", async () => {
    const user = userEvent.setup();
    render(<PasswordPage location={createMockLocation()} />);

    const submitButton = screen.getByRole("button");
    expect(submitButton).toBeDisabled();

    await user.type(screen.getByLabelText(/password/i), "sometext");
    expect(submitButton).toBeEnabled();
  });

  it("shows error message when user submits wrong password", async () => {
    const user = userEvent.setup();
    vi.stubEnv("GATSBY_PASSWORD", "correctpassword");

    render(<PasswordPage location={createMockLocation()} />);

    await user.type(screen.getByLabelText(/password/i), "wrongpassword");
    await user.click(screen.getByRole("button"));

    expect(screen.getByText(/Incorrect password/i)).toBeInTheDocument();

    vi.unstubAllEnvs();
  });

  it("clears error message when user clears the input", async () => {
    const user = userEvent.setup();
    vi.stubEnv("GATSBY_PASSWORD", "correctpassword");

    render(<PasswordPage location={createMockLocation()} />);

    const passwordInput = screen.getByLabelText(/password/i);
    await user.type(passwordInput, "wrongpassword");
    await user.click(screen.getByRole("button"));

    expect(screen.getByText(/Incorrect password/i)).toBeInTheDocument();

    await user.clear(passwordInput);

    expect(screen.queryByText(/Incorrect password/i)).not.toBeInTheDocument();

    vi.unstubAllEnvs();
  });

  it("sets cookie and navigates to referrer when password is correct", async () => {
    const user = userEvent.setup();
    vi.stubEnv("GATSBY_PASSWORD", "correctpassword");

    render(<PasswordPage location={createMockLocation()} />);

    await user.type(screen.getByLabelText(/password/i), "correctpassword");
    await user.click(screen.getByRole("button"));

    expect(setCookie).toHaveBeenCalled();
    expect(navigate).toHaveBeenCalledWith("/case-studies/near-u");

    vi.unstubAllEnvs();
  });

  it("navigates to home when no referrer is provided", async () => {
    const user = userEvent.setup();
    vi.stubEnv("GATSBY_PASSWORD", "correctpassword");

    render(<PasswordPage location={createMockLocation({ state: null })} />);

    await user.type(screen.getByLabelText(/password/i), "correctpassword");
    await user.click(screen.getByRole("button"));

    expect(navigate).toHaveBeenCalledWith("/");

    vi.unstubAllEnvs();
  });

  it("redirects immediately if password cookie is already set", () => {
    vi.mocked(isPasswordSet).mockReturnValue(true);

    render(<PasswordPage location={createMockLocation()} />);

    expect(navigate).toHaveBeenCalledWith("/case-studies/near-u");
  });
});
