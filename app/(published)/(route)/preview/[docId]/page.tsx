"use client";
import Image from "next/image";

import Logo from "@/app/(marketing)/_components/logo";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import Link from "next/link";
import React from "react";
import ContentDoc from "./contentDoc";

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
  return (
    <div className="min-h-screen ">
      <nav className="flex justify-between p-4 ">
        <h1 className="text-gray-500 font-semibold ">© Made By Shebl</h1>
        <Logo />
      </nav>
      <div className="flex gap-10 justify-center items-center p-4 bg-blue-500 shadow-lg text-white font-medium text-lg capitalize ">
        <p>this note for view only</p>
        <p className="flex gap-2 items-center ">
          <p> you can create & share</p>
          <Link
            href={"/"}
            className="bg-gray-100 rounded-full py-1 px-4 text-blue-500 shadow-xl"
          >
            login
          </Link>
        </p>
      </div>
      {document.coverImage && (
        <div
          className={`w-full relative md:h-[36vh] overflow-hidden bg-gray-200 ${
            !document.coverImage && "h-[12vh]"
          }`}
        >
          <Image
            src={document.coverImage}
            alt="cover"
            width={1600}
            height={300}
            className="object-cover w-full"
          />
        </div>
      )}

      <div className="md:max-w-xl lg:max-w-3xl p-4 flex flex-col gap-2 mx-auto">
        <div className="flex justify-start flex-col">
          <div className="text-[40px] md:text-[60px] ">{document.icon}</div>
          <h2 className="text-5xl md:text-6xl font-bold">{document.title}</h2>
        </div>
        <ContentDoc content={document.content} />
      </div>
    </div>
  );
}

export default PublishedDoc;
