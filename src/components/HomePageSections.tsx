import { navigate } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

import ArrowRight from "assets/arrowRight.svg";

import { useHomePageSections } from "hooks/useHomePageSections";

const HomePageSections = () => {
  const allSections = useHomePageSections();

  return (
    <article className="py-[60px] grid gap-12">
      {allSections.map(section => {
        const {
          projectRole,
          projectTitle,
          projectDescription,
          projectImage,
          projectPath,
        } = section;

        const image = projectImage?.file?.contentType?.includes("gif")
          ? projectImage.file.url
          : getImage(projectImage);

        return (
          <section
            key={projectTitle}
            className="flex flex-col sm:grid sm:grid-flow-col gap-x-9 cursor-pointer"
            onClick={
              projectPath
                ? () => {
                    navigate(projectPath);
                  }
                : undefined
            }
          >
            {image && (
              <>
                {typeof image === "string" ? (
                  <img
                    className="row-span-4 col-span-2"
                    src={image}
                    alt={projectTitle ?? ""}
                  />
                ) : (
                  <GatsbyImage
                    image={image}
                    alt={projectTitle ?? ""}
                    className="row-span-4 col-span-2"
                  />
                )}
              </>
            )}
            <p className="text-base sm:text-xl font-normal text-grey-3 pt-8 pb-1 sm:py-0 sm:pb-8">
              {projectRole}
            </p>
            <h3 className="pb-3 sm:pb-8 text-2xl sm:text-[54px] leading-tight font-normal">
              {projectTitle}
            </h3>
            <p className="text-base sm:text-xl font-normal text-grey-1 leading-6 sm:max-w-[400px]">
              <span>{projectDescription?.projectDescription}</span>
              <span
                className="text-[#0166CC] flex items-center mt-8 text-sm sm:text-xl"
                onClick={() => navigate(projectPath)}
              >
                Read More
                <ArrowRight className="pl-2 w-6" />
              </span>
            </p>
          </section>
        );
      })}
    </article>
  );
};

export default HomePageSections;
