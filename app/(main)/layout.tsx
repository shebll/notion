"use client";

import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";
import React from "react";
import Navigation from "./_components/navigation";
import Image from "next/image";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useConvexAuth();
  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center ">
        <Image src={"/spinner.gif"} width={30} height={30} alt="spinner" />
      </div>
    );
  }
  if (!isAuthenticated) {
    redirect("/");
  }
  return (
    <main className="flex flex-row h-screen w-full ">
      <Navigation />
      <div className="flex-1">{children}</div>
    </main>
  );
}