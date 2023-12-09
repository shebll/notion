"use client";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

import { useMutation, useQuery } from "convex/react";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";

import { toast } from "sonner";

interface props {
  parentDocument?: Id<"documents">;
  level?: number;
  data?: Doc<"documents">;
}
type expandType = {
  documentId: string;
  expanded: boolean;
};

function DocumentsPage({ parentDocument, level = 0 }: props) {
  const router = useRouter();
  const param = useParams();

  const archive = useMutation(api.documents.archive);
  const create = useMutation(api.documents.create);
  const documents = useQuery(api.documents.get, {
    parentDocument: parentDocument,
  });

  const [expand, setExpand] = useState<expandType[]>([
    { documentId: "", expanded: false },
  ]);

  const createNote = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    documentId?: Id<"documents">
  ) => {
    e.stopPropagation();
    e.preventDefault();
    const promise = create({
      title: "noteName",
      parentDocument: documentId,
    });
    toast.promise(promise, {
      loading: "Making New Note ....",
      success: "New Note Created",
      error: "Failed Try Agin",
    });

    const existingItem = expand.find(
      (item) => item.documentId === (documentId as string)
    );
    console.log(
      expand.find((item) => item.documentId === (documentId as string))
    );
    if (existingItem) {
      // existingItem.expanded = true;
      // console.log(existingItem.expanded);
      setExpand((prev) =>
        prev.map((item) =>
          item.documentId === (documentId as string)
            ? { ...item, expanded: true }
            : item
        )
      );
    } else {
      setExpand((prev) => [
        ...prev,
        {
          documentId: documentId as string,
          expanded: true,
        },
      ]);
    }
  };

  const onExpand = (documentId: string) => {
    const existingItem = expand.find((item) => item.documentId === documentId);
    if (existingItem) {
      setExpand((prev) =>
        prev.map((item) =>
          item.documentId === documentId
            ? { ...item, expanded: !item.expanded }
            : item
        )
      );
    } else {
      setExpand((prev) => [
        ...prev,
        {
          documentId: documentId,
          expanded: true,
        },
      ]);
    }
  };
  const deleteNote = (documentId: Id<"documents">) => {
    if (!documentId) return;
    const promise = archive({ documentId });
    toast.promise(promise, {
      loading: "Moving to trash...",
      success: "Note moved to trash!",
      error: "Failed to archive note.",
    });
  };

  return (
    <>
      {documents?.length === 0 && (
        <p
          style={{ paddingLeft: `${level * 20 + 20}px` }}
          className="font-medium  capitalize text-gray-500"
        >
          no Note Yet !
        </p>
      )}
      <div className="flex flex-col gap-1">
        {documents?.map(
          (document) =>
            document.isArchive !== true && (
              <div key={document._id} className="gap-2">
                <div className="hover:bg-gray-300 transition-all">
                  <div
                    style={{ paddingLeft: `${level * 20 + 20}px` }}
                    className="flex justify-between py-1 px-4"
                  >
                    <div className="flex flex-row gap-1 items-center ">
                      <div
                        onClick={() => onExpand(document._id)}
                        role="button"
                        className="hover:bg-gray-200 transition-all p-1 rounded-md "
                      >
                        <Image
                          src={"/arrow-light.png"}
                          alt="file"
                          width={16}
                          height={16}
                          className={` rotate-[-180deg] transition-all ${
                            expand.find(
                              (item) => item.documentId == document._id
                            )?.expanded && "rotate-[-90deg]"
                          }`}
                        />
                      </div>
                      {document.icon ? (
                        <div className="">{document.icon}</div>
                      ) : (
                        <div className="">
                          <Image
                            src={"/file-light.png"}
                            alt="file"
                            width={20}
                            height={20}
                          />
                        </div>
                      )}
                      <h1 className="flex-1 text-ellipsis overflow-hidden whitespace-nowrap">
                        {document.title}
                      </h1>
                    </div>
                    <div className="flex gap-1 items-center ">
                      <div
                        role="button"
                        onClick={(e) => createNote(e, document._id)}
                        className="hover:bg-gray-200 p-1 rounded-md flex-shrink-0"
                      >
                        <Image
                          src={"/plus-light.png"}
                          alt="file"
                          width={16}
                          height={16}
                          className=""
                        />
                      </div>
                      <div
                        role="button"
                        onClick={(e) => deleteNote(document._id)}
                        className="hover:bg-gray-200 p-1 rounded-md flex-shrink-0"
                      >
                        <Image
                          src={"/trash-light.png"}
                          alt="file"
                          width={20}
                          height={20}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {expand.find((item) => item.documentId == document._id)
                  ?.expanded && (
                  <DocumentsPage
                    parentDocument={document._id}
                    level={level + 1}
                  />
                )}
              </div>
            )
        )}
      </div>
    </>
  );
}
export default DocumentsPage;
