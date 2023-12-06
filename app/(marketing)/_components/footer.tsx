import React from "react";
import Link from "next/link";
import Logo from "./logo";

function Footer() {
  return (
    <div className="flex flex-row justify-between p-6 items-center w-full">
      <Logo />
      <div className="flex flex-row gap-4">
        <Link
          href={"/"}
          className="underline text-slate-600 hover:text-slate-900 dark:text-slate-200  dark:hover:text-slate-50 "
        >
          Privacy Police
        </Link>
        <Link
          href={"/"}
          className="underline text-slate-600 hover:text-slate-900 dark:text-slate-200  dark:hover:text-slate-50 "
        >
          More Resources
        </Link>
      </div>
    </div>
  );
}

export default Footer;
