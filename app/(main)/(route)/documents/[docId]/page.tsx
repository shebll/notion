"use client";
import React from "react";
import DocNavBar from "./_components/DocNavBar";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import DocContent from "./_components/DocContent";
type props = {
  params: { docId: string };
};
function DocumentPage({ params: { docId } }: props) {
  const fetchDoc = useQuery(api.documents.getDocument, {
    documentId: docId as Id<"documents">,
  });
  if (!fetchDoc)
    return (
      <p className="p-4 pt-14 w-full h-full flex justify-center items-center">
        ...
      </p>
    );
  return (
    <div className="pt-14">
      <DocNavBar document={fetchDoc} />
      <DocContent document={fetchDoc} />
    </div>
  );
}

export default DocumentPage;
