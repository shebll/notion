import React from "react";
import Footer from "./_components/footer";
import NavBar from "./_components/ navbar";

function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="dark:bg-slate-900 dark:text-white text-slate-900 bg-white">
      <NavBar />
      <div className="">{children}</div>
      <Footer />
    </div>
  );
}

export default MarketingLayout;
