import { HeadFC, PageProps, graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

import MainLayout from "components/MainLayout";
import SEO from "components/SEO";

const SectionPage = ({ data }: PageProps<Queries.CaseStudyQuery>) => {
  const { contentfulCaseStudy } = data;

  const heroImage = getImage(contentfulCaseStudy?.heroImage ?? null);
  const overview = contentfulCaseStudy?.caseStudyOverview;

  const overviewPics = (overview?.overviewPics ?? []).map(pic => {
    return getImage(pic);
  });

  const caseStudySection = contentfulCaseStudy?.caseStudySection;

  return (
    <MainLayout>
      <div className="mr-[-3rem] ml-[-3rem]">
        {heroImage && (
          <GatsbyImage
            image={heroImage}
            alt={contentfulCaseStudy?.heroTitle ?? ""}
          />
        )}
      </div>
      <h1 className="text-grey-1 font-normal text-center text-xl sm:text-[54px] py-4 sm:py-10">
        {contentfulCaseStudy?.heroTitle}
      </h1>
      {/** Overview */}
      <section className="flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-start max-w-2xl py-8 sm:py-32">
          <p className="text-sm sm:text-xl font-normal text-grey-3">
            {overview?.projectRole}
          </p>
          <h2 className="text-4xl font-medium text-grey-1 my-6">
            {overview?.overviewTitle}
          </h2>
          {overview?.boldText && (
            <p className="text-grey-1 text-sm sm:text-xl mb-5 font-bold">
              {overview?.boldText}
            </p>
          )}
          <p className="text-grey-1 font-normal text-sm sm:text-xl">
            {overview?.roleDescription?.roleDescription}
          </p>
        </div>
        {overviewPics.map((pic, index) => {
          return (
            <div key={index}>
              {pic && (
                <GatsbyImage
                  image={pic}
                  alt={overview?.overviewPicsCaption ?? ""}
                />
              )}
            </div>
          );
        })}
        <p className="text-center text-grey-2 font-normal text-sm sm:text-xl mt-2.5">
          {overview?.overviewPicsCaption}
        </p>
      </section>
      {/** case study sections*/}
      {caseStudySection?.map(section => {
        const image1 = getImage(section?.image1 ?? null);
        const image1Caption = section?.image1Caption;
        const image2 = getImage(section?.image2 ?? null);
        const image2Caption = section?.image2Caption;
        const image3 = getImage(section?.image3 ?? null);
        const image3Caption = section?.image3Caption;
        const image4 = getImage(section?.image4 ?? null);
        const image4Caption = section?.image4Caption;
        const image5 = getImage(section?.image5 ?? null);
        const image5Caption = section?.image5Caption;

        return (
          <section className="flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center items-start max-w-2xl py-8 sm:py-32">
              <h2 className="text-4xl font-medium text-grey-1 my-6">
                {section?.sectionTitle}
              </h2>
              <p className="text-grey-1 font-normal text-sm sm:text-xl">
                {(section?.sectionDescription?.sectionDescription ?? "")
                  .split("\n")
                  .map((item, i) => {
                    return (
                      <p key={i}>
                        {item}
                        <br />
                      </p>
                    );
                  })}
              </p>
            </div>
            {image1 && (
              <>
                <div className="pt:4 sm:pt-14">
                  {image1 && (
                    <GatsbyImage
                      image={image1}
                      alt={overview?.overviewPicsCaption ?? ""}
                    />
                  )}
                </div>
                <p className="text-center text-grey-2 font-normal text-sm sm:text-xl mt-2.5 pb-6 sm:pb-14">
                  {image1Caption}
                </p>
              </>
            )}
            {image2 && (
              <>
                <div className="pt:4 sm:pt-14">
                  {image2 && (
                    <GatsbyImage
                      image={image2}
                      alt={overview?.overviewPicsCaption ?? ""}
                    />
                  )}
                </div>
                <p className="text-center text-grey-2 font-normal text-sm sm:text-xl mt-2.5 pb-6 sm:pb-14">
                  {image2Caption}
                </p>
              </>
            )}
            {image3 && (
              <>
                <div className="pt:4 sm:pt-14">
                  {image3 && (
                    <GatsbyImage
                      image={image3}
                      alt={overview?.overviewPicsCaption ?? ""}
                    />
                  )}
                </div>
                <p className="text-center text-grey-2 font-normal text-sm sm:text-xl mt-2.5 pb-6 sm:pb-14">
                  {image3Caption}
                </p>
              </>
            )}
            {image4 && (
              <>
                <div className="pt:4 sm:pt-14">
                  {image4 && (
                    <GatsbyImage
                      image={image4}
                      alt={overview?.overviewPicsCaption ?? ""}
                    />
                  )}
                </div>
                <p className="text-center text-grey-2 font-normal text-sm sm:text-xl mt-2.5 pb-6 sm:pb-14">
                  {image4Caption}
                </p>
              </>
            )}
            {image5 && (
              <>
                <div className="pt:4 sm:pt-14">
                  {image5 && (
                    <GatsbyImage
                      image={image5}
                      alt={overview?.overviewPicsCaption ?? ""}
                    />
                  )}
                </div>
                <p className="text-center text-grey-2 font-normal text-sm sm:text-xl mt-2.5 pb-6 sm:pb-14">
                  {image5Caption}
                </p>
              </>
            )}
          </section>
        );
      })}
    </MainLayout>
  );
};

export default SectionPage;

export const query = graphql`
  query CaseStudy($id: String) {
    contentfulCaseStudy(id: { eq: $id }) {
      heroImage {
        gatsbyImageData(
          layout: CONSTRAINED
          placeholder: BLURRED
          formats: [AUTO, WEBP, AVIF]
        )
      }
      heroTitle
      caseStudyOverview {
        projectRole
        overviewTitle
        boldText
        roleDescription {
          roleDescription
        }
        overviewPics {
          gatsbyImageData(
            layout: CONSTRAINED
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
          )
        }
        overviewPicsCaption
      }
      caseStudySection {
        sectionTitle
        sectionDescription {
          sectionDescription
        }
        image1 {
          gatsbyImageData(
            layout: CONSTRAINED
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
          )
        }
        image1Caption
        image2 {
          gatsbyImageData(
            layout: CONSTRAINED
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
          )
        }
        image2Caption
        image3 {
          gatsbyImageData(
            layout: CONSTRAINED
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
          )
        }
        image3Caption
        image4 {
          gatsbyImageData(
            layout: CONSTRAINED
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
          )
        }
        image4Caption
        image5 {
          gatsbyImageData(
            layout: CONSTRAINED
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
          )
        }
        image5Caption
      }
    }
  }
`;

export const Head: HeadFC = () => <SEO title="Case study Page" />;
