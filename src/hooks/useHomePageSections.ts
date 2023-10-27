import { graphql, useStaticQuery } from "gatsby";

export const useHomePageSections = () => {
  const data = useStaticQuery<Queries.AllHomePageSectionsQuery>(graphql`
    query AllHomePageSections {
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
          projectPath: gatsbyPath(
            filePath: "/case-studies/{ContentfulHomePageSections.sectionName}"
          )
        }
      }
    }
  `);

  return data.allContentfulHomePageSections.nodes;
};
