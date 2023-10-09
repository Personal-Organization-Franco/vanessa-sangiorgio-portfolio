import { graphql, useStaticQuery } from "gatsby";

export const useSiteMetadata = () => {
  const data = useStaticQuery<Queries.SiteMetadataQueryQuery>(graphql`
    query SiteMetadataQuery {
      site {
        siteMetadata {
          title
          description
          siteUrl
        }
      }
    }
  `);

  return {
    title: data.site?.siteMetadata?.title ?? "Vanessa Sangiorgio",
    description: data.site?.siteMetadata?.description ?? "",
    siteUrl: data.site?.siteMetadata?.siteUrl ?? "",
  };
};
