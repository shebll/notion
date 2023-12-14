"use client";
import React from "react";
import DocNavBar from "./_components/DocNavBar";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import DocContent from "./_components/DocContent";
import useStoreName from "@/app/(main)/_components/useDocName";
type props = {
  params: { docId: string };
};
function DocumentPage({ params: { docId } }: props) {
  const { setName, name } = useStoreName();
  const fetchDoc = useQuery(api.documents.getDocument, {
    documentId: docId as Id<"documents">,
  });
  setName(fetchDoc?.title as string);
  if (!fetchDoc)
    return (
      <p className="p-4 pt-14 w-full h-full flex justify-center items-center">
        ...
      </p>
    );
  return (
    <div className="pt-14 ">
      <DocNavBar document={fetchDoc} />
      <DocContent document={fetchDoc} />
    </div>
  );
}

export default DocumentPage;
