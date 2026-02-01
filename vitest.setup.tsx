import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

// Mock Gatsby's navigate function
vi.mock("gatsby", async () => {
  const actual = await vi.importActual<typeof import("gatsby")>("gatsby");
  return {
    ...actual,
    navigate: vi.fn(),
    Link: ({
      to,
      children,
      ...props
    }: {
      to: string;
      children: React.ReactNode;
    }) => (
      <a href={to} {...props}>
        {children}
      </a>
    ),
    graphql: vi.fn(),
    useStaticQuery: vi.fn(),
  };
});

// Mock gatsby-plugin-image
vi.mock("gatsby-plugin-image", () => ({
  GatsbyImage: ({
    image,
    alt,
    ...props
  }: {
    image: unknown;
    alt: string;
  }) => <img alt={alt} {...props} data-testid="gatsby-image" />,
  getImage: vi.fn(image => image),
  StaticImage: ({
    src,
    alt,
    ...props
  }: {
    src: string;
    alt: string;
  }) => <img src={src} alt={alt} {...props} />,
}));

// Mock SVG imports
vi.mock("assets/arrowRight.svg", () => ({
  default: () => <span data-testid="arrow-right-icon">→</span>,
}));

vi.mock("assets/padlock.svg", () => ({
  default: ({ className }: { className?: string }) => (
    <span data-testid="padlock-icon" className={className}>
      🔒
    </span>
  ),
}));

vi.mock("assets/arrow-circle-right.svg", () => ({
  default: () => <span data-testid="arrow-circle-right-icon">→</span>,
}));
