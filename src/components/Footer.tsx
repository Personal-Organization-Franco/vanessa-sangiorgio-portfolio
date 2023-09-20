import React from "react";

const Footer = ({ children }: { children: React.ReactNode }) => {
	return <footer className="py-12">{children}</footer>;
};

export default Footer;
