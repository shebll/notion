"use client";
import { useConvexAuth } from "convex/react";
import { SignInButton } from "@clerk/clerk-react";

import Link from "next/link";

function Heading() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  return (
    <div className="flex flex-col justify-center items-center gap-6 max-w-3xl">
      <h1 className="font-bold text-3xl sm:text-5xl lg:text-6xl text-slate-950 dark:text-slate-50">
        Your Ideas, Documents, & Plans. Unified. Welcome to{" "}
        <span className="underline">Jotion</span>
      </h1>
      <p className="font-medium text-slate-800 text-base sm:text-lg md:text-2xl dark:text-slate-200">
        Jotion is the connected workspace where <br />
        better, faster work happens.
      </p>

      {isLoading && (
        <div className="text-center bg-slate-600 shadow-lg rounded-md dark:bg-gray-200 h-[32px] w-[116.44px] cursor-wait text-white dark:text-gray-800 font-bold" />
      )}

      {!isAuthenticated && !isLoading && (
        <SignInButton mode="modal">
          <button className="bg-slate-800 shadow-lg rounded-md text-white transition-all font-medium text-base py-1 px-3 focus:scale-95  hover:scale-105 hover:bg-slate-900 dark:text-slate-800 dark:bg-gray-200 dark:hover:bg-gray-50 h-[32px] w-[116.44px] ">
            login
          </button>
        </SignInButton>
      )}

      {isAuthenticated && !isLoading && (
        <Link
          href={"/documents"}
          className="bg-slate-800 shadow-lg rounded-md text-white transition-all font-medium text-base py-1 px-3 focus:scale-95  hover:scale-105 hover:bg-slate-900 dark:text-slate-800 dark:bg-gray-200 dark:hover:bg-gray-50"
        >
          Enter Jotion
        </Link>
      )}
    </div>
  );
}

export default Heading;
