# Vanessa Sangiorgio Portfolio

Professional portfolio website for Vanessa Sangiorgio, London-based product
designer.

**Live**: <https://vanessasangiorgio.com>

## Tech Stack

- **Framework**: Gatsby 5.12 (React 18, TypeScript 5)
- **CMS**: Contentful (headless)
- **Styling**: Tailwind CSS 3.3 + PostCSS
- **Fonts**: Open Sans (Google Fonts)
- **Image Optimization**: gatsby-plugin-image, Sharp (responsive WEBP/AVIF)
- **Analytics**: Google Analytics 4
- **Deployment**: AWS S3 (GitHub Actions CI/CD)

## Features

- **Dynamic Content**: Case studies + sections fetched from Contentful
- **Password Protection**: Cookie-based auth for restricted case studies
- **Image Optimization**: Responsive images, lazy loading, dominant color
  placeholders
- **SEO**: Sitemap generation, meta tags, React Helmet
- **PWA**: Web manifest support

## Development

```bash
# Install dependencies
pnpm i --frozen-lockfile

# Local dev server
pnpm develop

# Production build
pnpm build

# Type checking
pnpm typecheck

# Linting
pnpm lint:fix
```

**Environment variables** (`.env.development`, `.env.production`):

```env
CONTENTFUL_ACCESS_TOKEN=<token>
PASSWORD=<password>
```

## Deployment

GitHub Actions workflow deploys to AWS S3 on push to `main`:

- Test: `s3://vanessa-sangiorgio-portfolio`
- Production: `s3://vanessasangiorgio.com`

Uses OIDC-based AWS credentials (no static keys).

## Architecture

![Architecture Diagram](diagrams/vanessa-portfolio-diagram.drawio.png)

## Project Structure

```text
src/
  components/   Layout, Hero, Sections, SEO, Header, Footer
  pages/        index, about, password, 404, case-studies/{dynamic}
  hooks/        GraphQL data hooks
  utils/        Cookie & auth utilities
  styles/       Tailwind config
  assets/       SVG icons
```

## Author

Francesco Albanese
