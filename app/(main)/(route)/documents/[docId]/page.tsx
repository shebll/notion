"use client";
import React from "react";
import DocNavBar from "./_components/DocNavBar";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
type props = {
  params: { docId: string };
};
function DocumentPage({ params: { docId } }: props) {
  const fetchDoc = useQuery(api.documents.getDocument, {
    documentId: docId as Id<"documents">,
  });
  if (!fetchDoc) return <p className="p-4 pt-14 ">...</p>;
  return (
    <div className="p-4 pt-14 ">
      <DocNavBar document={fetchDoc} />
      {fetchDoc.isArchive && (
        <p className="bg-red-600 p-4 text-white flex flex-row justify-center">
          Archive
        </p>
      )}
    </div>
  );
}

export default DocumentPage;
