import { graphql, useStaticQuery } from "gatsby";

export const use404 = () => {
  const data = useStaticQuery<Queries.FourOhFourQuery>(graphql`
    query FourOhFour {
      contentfulFourOhFour {
        errorCode
        oopsText
        cantFindPage
        helpfulText
        profilePic {
          gatsbyImageData(
            layout: CONSTRAINED
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
          )
        }
        navbarLinks {
          name
          to
        }
        externalLinks {
          name
          href
        }
      }
    }
  `);
  return data.contentfulFourOhFour;
};
