import { GatsbyImage, getImage } from "gatsby-plugin-image";

import { useHeaderSections } from "hooks/useHeaderSections";

const HomePageSections = () => {
  const allSections = useHeaderSections();

  return (
    <article className="py-[60px] grid gap-12">
      {allSections.map(section => {
        const { projectRole, projectTitle, projectDescription, projectImage } =
          section;

        const image = getImage(projectImage);

        return (
          <section key={projectTitle} className="grid grid-flow-col gap-x-9">
            {image && (
              <GatsbyImage
                image={image}
                alt={projectTitle ?? ""}
                className="row-span-3 col-span-2"
              />
            )}
            <p className="text-xl font-normal text-grey-3">{projectRole}</p>
            <h3 className="text-[54px] font-normal">{projectTitle}</h3>
            <p className="text-xl font-normal text-grey-1 leading-8 max-w-[400px]">
              {projectDescription?.projectDescription}
            </p>
          </section>
        );
      })}
    </article>
  );
};

export default HomePageSections;
