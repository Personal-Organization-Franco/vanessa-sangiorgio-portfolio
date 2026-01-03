import { HeadFC, PageProps, graphql, navigate } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { BLOCKS } from "@contentful/rich-text-types";
import ReactMarkdown from "react-markdown";

import MainLayout from "components/MainLayout";
import SEO from "components/SEO";
import { isPasswordSet } from "utils/isPasswordSet";

const SectionPage = ({
  data,
  params,
  location,
}: PageProps<Queries.CaseStudyQuery>) => {
  const passwordIsSet = isPasswordSet();
  const { contentfulCaseStudy } = data;

  const heroImage = getImage(contentfulCaseStudy?.heroImage ?? null);
  const overview = contentfulCaseStudy?.caseStudyOverview;

  const overviewPics = (overview?.overviewPics ?? []).map(pic => {
    return getImage(pic);
  });

  const caseStudySection = contentfulCaseStudy?.caseStudySection;

  if (!passwordIsSet) {
    if (params?.name === "near-u" && typeof window !== "undefined") {
      navigate("/password", {
        state: {
          from: location?.pathname,
        },
      });
      return null;
    }
  }
  return (
    <MainLayout>
      <div className="mx-[-1rem] sm:mx-[-3rem]">
        {heroImage && (
          <GatsbyImage
            image={heroImage}
            alt={contentfulCaseStudy?.heroTitle ?? ""}
          />
        )}
      </div>
      <h1 className="text-grey-1 font-normal text-center text-xl sm:text-[54px] leading-tight py-4 sm:py-10">
        {contentfulCaseStudy?.heroTitle}
      </h1>
      {contentfulCaseStudy?.heroSubtitle && (
        <h2 className="text-grey-1 font-normal italic text-center text-lg sm:text-[46px] leading-tight pb-4 sm:pb-10">
          {renderRichText(contentfulCaseStudy.heroSubtitle, {
            renderNode: {
              [BLOCKS.PARAGRAPH]: (_node, children) => <span>{children}</span>,
            },
          })}
        </h2>
      )}
      {/** Overview */}
      <section className="flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-start max-w-2xl py-8 sm:py-32">
          <p className="text-base sm:text-xl pt-8 pb-1 sm:py-0 sm:pb-0 font-normal text-grey-3">
            {overview?.projectRole}
          </p>
          <h2 className="text-2xl sm:text-4xl font-medium text-grey-1 mt-0 mb-6 sm:my-6">
            {overview?.overviewTitle}
          </h2>
          {overview?.boldText && (
            <p className="text-grey-1 text-base sm:text-xl mb-5 font-bold">
              {overview?.boldText}
            </p>
          )}
          <div className="text-grey-1 font-normal text-base sm:text-xl">
            <ReactMarkdown
              components={{
                p: ({ node, ...props }) => (
                  <p className="mb-4 last:mb-0" {...props} />
                ),
                strong: ({ node, ...props }) => (
                  <strong className="font-bold" {...props} />
                ),
                em: ({ node, ...props }) => (
                  <em className="italic" {...props} />
                ),
                ul: ({ node, ...props }) => (
                  <ul className="list-disc ml-6 mb-4" {...props} />
                ),
                ol: ({ node, ...props }) => (
                  <ol className="list-decimal ml-6 mb-4" {...props} />
                ),
                li: ({ node, ...props }) => <li className="mb-1" {...props} />,
              }}
            >
              {overview?.roleDescription?.roleDescription ?? ""}
            </ReactMarkdown>
          </div>
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
        //getImage(section?.image1 ?? null)
        const image1 = section?.image1?.file?.contentType?.includes("gif")
          ? section?.image1.file?.url
          : getImage(section?.image1 ?? null);
        const image1Caption = section?.image1Caption;
        const image2 = section?.image2?.file?.contentType?.includes("gif")
          ? section?.image2.file?.url
          : getImage(section?.image2 ?? null);
        const image2Caption = section?.image2Caption;
        const image3 = section?.image3?.file?.contentType?.includes("gif")
          ? section?.image3.file?.url
          : getImage(section?.image3 ?? null);
        const image3Caption = section?.image3Caption;
        const image4 = section?.image4?.file?.contentType?.includes("gif")
          ? section?.image4.file?.url
          : getImage(section?.image4 ?? null);
        const image4Caption = section?.image4Caption;
        const image5 = section?.image5?.file?.contentType?.includes("gif")
          ? section?.image5.file?.url
          : getImage(section?.image5 ?? null);
        const image5Caption = section?.image5Caption;

        return (
          <section
            className="flex flex-col justify-center items-center"
            key={section?.sectionTitle}
          >
            <div className="flex flex-col justify-center items-start max-w-2xl py-8 sm:py-32">
              <h2 className="text-2xl sm:text-4xl font-medium text-grey-1 my-6">
                {section?.sectionTitle}
              </h2>
              <div className="text-grey-1 font-normal text-base sm:text-xl">
                <ReactMarkdown
                  components={{
                    p: ({ node, ...props }) => (
                      <p className="mb-4 last:mb-0" {...props} />
                    ),
                    strong: ({ node, ...props }) => (
                      <strong className="font-bold" {...props} />
                    ),
                    em: ({ node, ...props }) => (
                      <em className="italic" {...props} />
                    ),
                    ul: ({ node, ...props }) => (
                      <ul className="list-disc ml-6 mb-4" {...props} />
                    ),
                    ol: ({ node, ...props }) => (
                      <ol className="list-decimal ml-6 mb-4" {...props} />
                    ),
                    li: ({ node, ...props }) => (
                      <li className="mb-1" {...props} />
                    ),
                  }}
                >
                  {section?.sectionDescription?.sectionDescription ?? ""}
                </ReactMarkdown>
              </div>
            </div>
            {image1 && (
              <>
                <div className="pt:4 sm:pt-14">
                  {typeof image1 === "string" ? (
                    <img src={image1} alt={image1Caption ?? ""} />
                  ) : (
                    <GatsbyImage image={image1} alt={image1Caption ?? ""} />
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
                  {typeof image2 === "string" ? (
                    <img src={image2} alt={image2Caption ?? ""} />
                  ) : (
                    <GatsbyImage image={image2} alt={image2Caption ?? ""} />
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
                  {typeof image3 === "string" ? (
                    <img src={image3} alt={image3Caption ?? ""} />
                  ) : (
                    <GatsbyImage image={image3} alt={image3Caption ?? ""} />
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
                  {typeof image4 === "string" ? (
                    <img src={image4} alt={image4Caption ?? ""} />
                  ) : (
                    <GatsbyImage image={image4} alt={image4Caption ?? ""} />
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
                  {typeof image5 === "string" ? (
                    <img src={image5} alt={image5Caption ?? ""} />
                  ) : (
                    <GatsbyImage image={image5} alt={image5Caption ?? ""} />
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
      heroSubtitle {
        raw
      }
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
          file {
            contentType
            url
          }
        }
        image1Caption
        image2 {
          gatsbyImageData(
            layout: CONSTRAINED
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
          )
          file {
            contentType
            url
          }
        }
        image2Caption
        image3 {
          gatsbyImageData(
            layout: CONSTRAINED
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
          )
          file {
            contentType
            url
          }
        }
        image3Caption
        image4 {
          gatsbyImageData(
            layout: CONSTRAINED
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
          )
          file {
            contentType
            url
          }
        }
        image4Caption
        image5 {
          gatsbyImageData(
            layout: CONSTRAINED
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
          )
          file {
            contentType
            url
          }
        }
        image5Caption
      }
    }
  }
`;

export const Head: HeadFC = () => <SEO title="Case study Page" />;
