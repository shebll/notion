"use client";
import React, { Suspense, useState } from "react";

import { useQuery } from "convex/react";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";

import DocumentItem from "./DocumentItem";

interface props {
  parentDocument?: Id<"documents">;
  level?: number;
  data?: Doc<"documents">;
}

function DocumentsPage({ parentDocument, level = 0 }: props) {
  const documents = useQuery(api.documents.get, {
    parentDocument: parentDocument,
  });

  return (
    <>
      {documents?.length === 0 && (
        <p
          style={{ paddingLeft: `${level * 20 + 20}px` }}
          className="font-medium  capitalize text-gray-500 py-[6px]"
        >
          no Note Yet !
        </p>
      )}
      <div className="flex flex-col gap-1 text-gray-700">
        {documents?.map(
          (document) =>
            document.isArchive !== true && (
              <Suspense key={document._id} fallback={"...."}>
                <DocumentItem document={document} level={level} />
              </Suspense>
            )
        )}
      </div>
    </>
  );
}
export default DocumentsPage;
