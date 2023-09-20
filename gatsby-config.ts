import dotenv from "dotenv";

dotenv.config({
	path: `.env.${process.env.NODE_ENV ?? "development"}`,
});

import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
	siteMetadata: {
		title: `Vanessa Sangiorgio Product Designer Portfolio`,
		description:
			"Vanessa Sangiorgio is a passionate and results-driven product designer with a deep understanding of user-centred design principles, based in London.",
		siteUrl: `https://www.yourdomain.tld`,
	},
	// More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
	// If you use VSCode you can also use the GraphQL plugin
	// Learn more at: https://gatsby.dev/graphql-typegen
	graphqlTypegen: true,
	plugins: [
		"gatsby-plugin-root-import",
		{
			resolve: `gatsby-omni-font-loader`,
			options: {
				enableListener: true,
				preconnect: [
					`https://fonts.googleapis.com`,
					`https://fonts.gstatic.com`,
				],
				web: [
					{
						name: "Open Sans",
						file: `https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;700&display=swap`,
					},
				],
			},
		},
		{
			resolve: "gatsby-source-contentful",
			options: {
				accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
				spaceId: "hx86lta6s1q6",
			},
		},
		"gatsby-plugin-image",
		{
			resolve: `gatsby-plugin-sharp`,
			options: {
				defaults: {
					formats: [`auto`, `webp`],
					placeholder: `dominantColor`,
					quality: 50,
					breakpoints: [360, 750, 1080, 1366, 1920],
					backgroundColor: `transparent`,
				},
			},
		},
		"gatsby-transformer-sharp",
		"gatsby-plugin-postcss",
		"gatsby-plugin-sitemap",
		{
			resolve: "gatsby-plugin-manifest",
			options: {
				icon: "src/images/icon.png",
			},
		},
		{
			resolve: "gatsby-source-filesystem",
			options: {
				name: "images",
				path: "./src/images/",
			},
			__key: "images",
		},
		{
			resolve: "gatsby-source-filesystem",
			options: {
				name: "pages",
				path: "./src/pages/",
			},
			__key: "pages",
		},
	],
};

export default config;
