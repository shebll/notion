"use client";
import { useConvexAuth } from "convex/react";
import { SignInButton } from "@clerk/clerk-react";
import Link from "next/link";
export default function SignInBtns() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  return (
    <div>
      {isLoading && (
        <div className="text-center bg-slate-600 shadow-lg rounded-md dark:bg-gray-200 h-[28px] w-[116.44px] cursor-wait text-white dark:text-gray-800 font-bold flex justify-center items-center">
          <div className=" animate-spin rounded-full border-dotted border-[2px] h-5 w-5 dark:border-black"></div>
        </div>
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
