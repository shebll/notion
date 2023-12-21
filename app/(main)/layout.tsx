"use client";

import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";
import React from "react";
import Navigation from "./_components/navigation";
import { EdgeStoreProvider } from "../lib/edgestore";
import Loading from "../loading";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useConvexAuth();
  if (isLoading) {
    return <Loading />;
  }
  if (!isAuthenticated) {
    redirect("/");
  }
  return (
    <main className="flex flex-row h-screen w-full ">
      <Navigation />
      <EdgeStoreProvider>
        <div className="flex-1 ">{children}</div>
      </EdgeStoreProvider>
    </main>
  );
}
