import React from "react";
import Footer from "./Footer";
import Header from "./Header";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="px-12 pt-4 flex flex-col min-h-screen">
      <Header />
      <section className="grow">{children}</section>
      <Footer>Something in the footer?</Footer>
    </main>
  );
};

export default MainLayout;
