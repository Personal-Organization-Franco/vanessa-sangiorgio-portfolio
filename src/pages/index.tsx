import type { HeadFC, PageProps } from "gatsby";
import SEO from "components/SEO";
import MainLayout from "components/MainLayout";
import HomePageHero from "components/HomePageHero";

const IndexPage = () => {
  return (
    <MainLayout>
      <HomePageHero />
    </MainLayout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <SEO title="Work Page" />;
