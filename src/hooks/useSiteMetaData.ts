import { graphql, useStaticQuery } from "gatsby";

type SiteMetaData = {
	site: {
		siteMetadata: {
			title: string;
			description: string;
			siteUrl: string;
		};
	};
};

export const useSiteMetadata = () => {
	const data = useStaticQuery<SiteMetaData>(graphql`
		query {
			site {
				siteMetadata {
					title
					description
					siteUrl
				}
			}
		}
	`);

	return data.site.siteMetadata;
};
