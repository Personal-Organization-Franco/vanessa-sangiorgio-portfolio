import React from "react";

const Footer = ({ children }: { children: React.ReactNode }) => {
  return <footer className="py-12 text-xl text-grey-2">{children}</footer>;
};

export default Footer;
