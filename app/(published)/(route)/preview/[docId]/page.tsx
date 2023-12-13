"use client";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import React from "react";
type props = {
  params: { docId: string };
};
function PublishedDoc({ params: { docId } }: props) {
  const document = useQuery(api.documents.getPublishedDocument, {
    documentId: docId as Id<"documents">,
  });
  if (!document)
    return (
      <p className="p-4 pt-14 w-full h-full flex justify-center items-center min-h-screen">
        ...
      </p>
    );
  return <div className="min-h-screen">{document.title}</div>;
}

export default PublishedDoc;
