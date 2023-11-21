import { graphql, PageProps, type HeadFC } from "gatsby";
import SEO from "components/SEO";
import MainLayout from "components/MainLayout";
import { useAboutPage } from "hooks/useAboutPage";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import useCheckPasswordSet from "hooks/useCheckPasswordSet";

const AboutPage = ({
  data: pageData,
}: PageProps<Queries.AboutPageLinksQuery>) => {
  useCheckPasswordSet();
  const data = useAboutPage();
  const image = getImage(data?.profilePic ?? null);

  return (
    <MainLayout>
      <div className="py-14 flex flex-col sm:flex-row justify-between items-start">
        <div className="flex flex-col mr-auto sm:max-w-[50%]">
          <h1 className="text-xl sm:text-4xl font-medium mb-20 text-grey-1">
            {data?.title}
          </h1>
          <p className="text-grey-1 text-sm sm:text-xl">
            {data?.description?.description}
          </p>
        </div>
        <div className="mt-16 sm:mt-0 sm:max-w-[50%]">
          {image && (
            <div className="sm:max-w-[50%] sm:ml-auto">
              <GatsbyImage
                image={image}
                alt={data?.title ?? "Profile Picture"}
              />
            </div>
          )}
        </div>
      </div>
      <nav className="mb-6 sm:mb-32 gap-16 flex flex-col sm:flex-row">
        {pageData?.contentfulHomePage?.heroLinks?.map(link => (
          <a
            className="text-sm sm:text-xl font-normal text-grey-2"
            href={link?.href ?? ""}
            target="_blank"
            key={link?.name}
          >
            {link?.name ?? ""}
          </a>
        ))}
      </nav>
    </MainLayout>
  );
};

export default AboutPage;

export const Head: HeadFC = () => <SEO title="About Page" />;

export const query = graphql`
  query AboutPageLinks {
    contentfulHomePage {
      heroLinks {
        name
        href
      }
    }
  }
`;
