import { graphql, useStaticQuery } from "gatsby";

export const useHeaderData = () => {
  const data = useStaticQuery<Queries.ContentfulHeaderQueryQuery>(graphql`
    query ContentfulHeaderQuery {
      contentfulHeader {
        logoText {
          logoText
        }
        navbar {
          name
          to
        }
      }
    }
  `);

  return {
    logoText: data.contentfulHeader?.logoText?.logoText ?? "Vanessa Sangiorgio",
    navbar: data.contentfulHeader?.navbar ?? [],
  };
};
