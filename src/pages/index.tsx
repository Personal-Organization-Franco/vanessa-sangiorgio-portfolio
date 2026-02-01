import HomePageHero from "components/HomePageHero";
import HomePageSections from "components/HomePageSections";
import MainLayout from "components/MainLayout";
import SEO from "components/SEO";
import type { HeadFC } from "gatsby";

const IndexPage = () => {
  return (
    <MainLayout>
      <HomePageHero />
      <HomePageSections />
    </MainLayout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <SEO title="Work Page" />;
