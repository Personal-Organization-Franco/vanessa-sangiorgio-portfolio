import { useSiteMetadata } from "hooks/useSiteMetaData";

type SEOProps = {
  title?: string;
  description?: string;
  children?: React.ReactNode;
};

const SEO = ({ title, description, children }: SEOProps) => {
  const { title: defaultTitle, description: defaultDescription = "" } =
    useSiteMetadata();

  const seo = {
    title: title ? `${defaultTitle} - ${title}` : defaultTitle,
    description: description || defaultDescription,
  };

  return (
    <>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      {children}
    </>
  );
};

export default SEO;
