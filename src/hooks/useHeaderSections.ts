import { graphql, useStaticQuery } from "gatsby";

export const useHeaderSections = () => {
  const data = useStaticQuery<Queries.AllHeaderSectionsQuery>(graphql`
    query AllHeaderSections {
      allContentfulHomePageSections(sort: { sortOrder: ASC }) {
        nodes {
          projectDescription {
            projectDescription
          }
          projectImage {
            gatsbyImageData(
              layout: CONSTRAINED
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
            )
            gatsbyImage(width: 996)
          }
          projectRole
          projectTitle
          sectionName
        }
      }
    }
  `);

  return data.allContentfulHomePageSections.nodes;
};
