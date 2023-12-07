"use client";
import Themes from "@/components/Themes";
import Link from "next/link";
import Logo from "./logo";
import Button from "./button";

import { useScrollTop } from "@/hocks/use-scroll-top";
import { useConvexAuth } from "convex/react";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import Image from "next/image";

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
          <div className="h-[44px] flex justify-center items-center">
            <Image src={"/spinner.gif"} width={20} height={20} alt="spinner" />
          </div>
        )}
        {!isAuthenticated && !isLoading && (
          <SignInButton mode="modal">
            <p>
              <Button buttonText="LogIn" />
            </p>
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
