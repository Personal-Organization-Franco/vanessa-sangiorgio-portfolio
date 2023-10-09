import * as React from "react";
import type { HeadFC } from "gatsby";
import { SEO } from "components/SEO";
import MainLayout from "components/MainLayout";

const AboutPage = () => {
  return (
    <MainLayout>
      <h1>This is the About page!</h1>
    </MainLayout>
  );
};

export default AboutPage;

export const Head: HeadFC = () => <SEO title="About Page" />;
