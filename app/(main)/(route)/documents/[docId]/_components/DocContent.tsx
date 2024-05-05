"use client";
import { Id } from "@/convex/_generated/dataModel";
import React from "react";
import NameDoc from "./NameDoc";
import UploadImage from "./UploadImage";
import Cover from "./Cover";
import Editor from "./Editor";

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
};
function DocContent({ document }: props) {
  return (
    <div className="h-[calc(100vh-94px)] overflow-y-scroll dark:bg-[#1F1F1F] dark:text-white text-slate-900 bg-white">
      {document.coverImage && (
        <Cover docId={document._id} coverImage={document.coverImage} />
      )}
      <div className="md:max-w-xl lg:max-w-3xl p-4 flex flex-col gap-2 mx-auto ">
        {!document.coverImage && <UploadImage docId={document._id} />}

        <NameDoc
          docIcon={document.icon!}
          docId={document._id}
          docTitle={document.title}
          size="large"
        />
        <Editor docId={document._id} content={document.content} />
      </div>
    </div>
  );
}

export default DocContent;
