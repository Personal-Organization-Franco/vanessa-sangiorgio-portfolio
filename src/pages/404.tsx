import { type HeadFC, Link } from "gatsby";

import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { use404 } from "hooks/use404";
import MainLayout from "../components/MainLayout";

const NotFoundPage = () => {
  const data = use404();

  const image = getImage(data?.profilePic ?? null);
  return (
    <MainLayout>
      <div className="py-14 flex justify-between items-start">
        <div className="flex flex-col mr-auto max-w-[50%]">
          <p className="text-grey-1 text-sm sm:text-xl mb-5">
            {data?.errorCode}
          </p>
          <h1 className="text-4xl font-medium text-grey-1">{data?.oopsText}</h1>
          <h2 className="text-4xl font-medium text-grey-1 mb-8">
            {data?.cantFindPage}
          </h2>
          <p className="text-grey-1 text-sm sm:text-xl mb-3">
            {data?.helpfulText}
          </p>
          <nav className="flex flex-col">
            {data?.navbarLinks?.map(link => {
              return (
                <Link
                  to={link?.to ?? "/"}
                  className="font-normal text-grey-2 text-sm sm:text-xl mb-5"
                  key={link?.name}
                >
                  {link?.name ?? ""}
                </Link>
              );
            })}
            {data?.externalLinks?.map(link => (
              <a
                className="text-sm sm:text-xl font-normal text-grey-2 mb-5"
                href={link?.href ?? ""}
                target="_blank"
                key={link?.name}
                rel="noreferrer"
              >
                {link?.name?.includes("vanessa") ? "Email" : (link?.name ?? "")}
              </a>
            ))}
          </nav>
        </div>
        <div className="max-w-[50%]">
          {image && (
            <div className="max-w-[50%] ml-auto">
              <GatsbyImage image={image} alt="Profile Picture" />
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default NotFoundPage;

export const Head: HeadFC = () => <title>Not found</title>;
