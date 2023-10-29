import { graphql, useStaticQuery } from "gatsby";
import slugify from "@sindresorhus/slugify";

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
        }
      }
    }
  `);

  return data.allContentfulHomePageSections.nodes.map(node => ({
    ...node,
    projectPath: `/case-studies/${slugify(node?.sectionName ?? "")}`,
  }));
};
