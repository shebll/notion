"use client";
import Link from "next/link";
import Logo from "./logo";

import { useScrollTop } from "@/hooks/use-scroll-top";
import { useConvexAuth } from "convex/react";
import { SignInButton, UserButton } from "@clerk/clerk-react";

function NavBar() {
  const { isLoading, isAuthenticated } = useConvexAuth();
  const scrolled = useScrollTop();
  return (
    <nav
      className={`flex flex-row justify-between py-3 px-6 items-center fixed top-0 w-full bg-inherit transition-all  ${
        scrolled && "shadow-xl"
      }`}
    >
      <Logo />
      <div className="flex flex-row gap-4 items-center">
        {isLoading && (
          <div className=" flex flex-row gap-4 items-center">
            <div className="text-center bg-slate-600 shadow-lg rounded-md dark:bg-gray-200 h-[28px] w-[116.44px] cursor-wait text-white dark:text-gray-800 font-bold flex justify-center items-center">
              <div className=" animate-spin rounded-full border-dotted border-[2px] h-5 w-5 dark:border-black"></div>
            </div>
            <div className="w-8 h-8 rounded-full bg-gray-200 cursor-wait" />
          </div>
        )}
        {!isAuthenticated && !isLoading && (
          <SignInButton mode="modal">
            <button className="bg-slate-800 shadow-lg rounded-md text-white transition-all font-medium text-base py-1 px-3 focus:scale-95  hover:scale-105 hover:bg-slate-900 dark:text-slate-800 dark:bg-gray-200 dark:hover:bg-gray-50 h-[32px] w-[116.44px] ">
              LogIn
            </button>
          </SignInButton>
        )}

        {isAuthenticated && !isLoading && (
          <>
            <Link
              href={"/documents"}
              className="bg-slate-800 shadow-lg rounded-md text-white transition-all font-medium text-base py-1 px-3 focus:scale-95  hover:scale-105 hover:bg-slate-900 dark:text-slate-800 dark:bg-gray-200 dark:hover:bg-gray-50"
            >
              Enter Jotion
            </Link>
            <UserButton afterSignOutUrl="/" />
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
