"use client";

import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";
import React from "react";
import Navigation from "./_components/navigation";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useConvexAuth();
  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center ">...</div>
    );
  }
  if (!isAuthenticated) {
    redirect("/");
  }
  return (
    <main className="flex flex-row h-screen w-full ">
      <Navigation />
      <div className="flex-1 ">{children}</div>
    </main>
  );
}
