import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { SEO } from "components/SEO";
import MainLayout from "components/MainLayout";

const IndexPage = () => {
	return (
		<MainLayout>
			<h1>This is the main page!</h1>
		</MainLayout>
	);
};

export default IndexPage;

export const Head: HeadFC = () => <SEO title="Work Page" />;
