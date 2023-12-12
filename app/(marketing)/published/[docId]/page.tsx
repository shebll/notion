"use client";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import React from "react";
type props = {
  params: { docId: string };
};
function Page({ params: { docId } }: props) {
  const fetchDoc = useQuery(api.documents.getDocument, {
    documentId: docId as Id<"documents">,
  });
  if (!fetchDoc)
    return (
      <p className="p-4 pt-14 w-full h-full flex justify-center items-center">
        ...
      </p>
    );
  return <div className="min-h-screen">doc pages</div>;
}

export default Page;
