"use client";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import React, { useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import DocumentsPage from "./DocumentList";
import { useParams, useRouter } from "next/navigation";

type props = {
  document: {
    _id: Id<"documents">;
    _creationTime: number;
    content?: string | undefined;
    icon?: string | undefined;
    parentDocument?: Id<"documents"> | undefined;
    coverImage?: string | undefined;
    isPublished?: boolean | undefined;
    title: string;
    userId: string;
    isArchive: boolean;
  };
  level: number;
};
type expandType = {
  documentId: string;
  expanded: boolean;
};

function DocumentItem({ document, level }: props) {
  const router = useRouter();
  const param = useParams();
  const archive = useMutation(api.documents.archive);
  const create = useMutation(api.documents.create);

  const [expand, setExpand] = useState<expandType[]>([
    { documentId: "", expanded: false },
  ]);

  const createNestedNote = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    documentId: Id<"documents">
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
    if (existingItem) {
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

  const deleteNote = (documentId: Id<"documents">) => {
    if (!documentId) return;
    const promise = archive({ documentId });
    toast.promise(promise, {
      loading: "Moving to trash...",
      success: "Note moved to trash!",
      error: "Failed to archive note.",
    });
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

  return (
    <div>
      <div className="hover:bg-gray-300 transition-all">
        <div
          style={{ paddingLeft: `${level * 20 + 20}px` }}
          className="flex justify-between py-1 px-4"
        >
          <div className="flex flex-row gap-1 items-center max-w-[70%] ">
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
                  expand.find((item) => item.documentId == document._id)
                    ?.expanded && "rotate-[-90deg]"
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
              onClick={(e) => createNestedNote(e, document._id)}
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
      {expand.find((item) => item.documentId == document._id)?.expanded && (
        <DocumentsPage parentDocument={document._id} level={level + 1} />
      )}
    </div>
  );
}

export default DocumentItem;
