import type { HeadFC } from "gatsby";
import SEO from "components/SEO";
import MainLayout from "components/MainLayout";
import HomePageHero from "components/HomePageHero";
import HomePageSections from "components/HomePageSections";
import useCheckPasswordSet from "hooks/useCheckPasswordSet";

const IndexPage = () => {
  useCheckPasswordSet();
  return (
    <MainLayout>
      <HomePageHero />
      <HomePageSections />
    </MainLayout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <SEO title="Work Page" />;
