"use client";
import { Id } from "@/convex/_generated/dataModel";
import React from "react";
import Image from "next/image";
import NameDoc from "./NameDoc";
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
    <div>
      {document.coverImage && (
        <div className="w-full h-[36vh] overflow-hidden">
          <Image
            src={document.coverImage}
            alt="cover"
            width={1600}
            height={100}
            className="object-cover"
          />
        </div>
      )}
      <div
        className={`md:max-w-xl lg:max-w-3xl p-4 flex flex-col gap-2 mx-auto ${
          document.coverImage ? "pt-[100px]" : "pt-[200px]"
        }`}
      >
        <NameDoc
          docIcon={document.icon!}
          docId={document._id}
          docTitle={document.title}
          size="large"
        />
      </div>
    </div>
  );
}

export default DocContent;
