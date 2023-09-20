import React from "react";

import type { PageProps } from "gatsby";
import { Link } from "gatsby";

const Article = (props: PageProps<Queries.ContentfulLayoutEdge["node"]>) => {
	return (
		<div>
			<p>This is an article, who cares</p>
			<Link
				activeClassName="active"
				to="/"
				getProps={props => {
					console.log(props);
					return {};
				}}
			></Link>
		</div>
	);
};
export default Article;
