import { graphql, useStaticQuery } from "gatsby";

export const useAboutPage = () => {
  const data = useStaticQuery<Queries.AboutPageQuery>(graphql`
    query AboutPage {
      contentfulAboutPage {
        title
        description {
          description
        }
        profilePic {
          gatsbyImageData(
            layout: CONSTRAINED
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
          )
        }
      }
    }
  `);

  return data.contentfulAboutPage;
};
