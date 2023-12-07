"use client";
import React from "react";
import Button from "./button";
import { useConvexAuth } from "convex/react";
import { SignInButton } from "@clerk/clerk-react";

import Link from "next/link";
import Image from "next/image";

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
      {!isAuthenticated && isLoading && (
        <div className="h-[44px] flex justify-center items-center">
          <Image src={"/spinner.gif"} width={30} height={30} alt="spinner" />
        </div>
      )}
      {!isAuthenticated && !isLoading && (
        <SignInButton mode="modal">
          <p>
            <Button buttonText={"Login"} />
          </p>
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
