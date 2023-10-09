import { graphql, useStaticQuery } from "gatsby";

export const useHeaderHero = () => {
  const data = useStaticQuery<Queries.HeaderHeroQueryQuery>(graphql`
    query HeaderHeroQuery {
      contentfulHomePage {
        heroText
        heroLinks {
          name
          href
        }
      }
    }
  `);

  return {
    heroText: data.contentfulHomePage?.heroText ?? "Vanessa Sangiorgio",
    heroLinks: data.contentfulHomePage?.heroLinks ?? [],
  };
};
