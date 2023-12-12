"use client";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import Image from "next/image";
import React, { useState } from "react";
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
function DocFunctionally({ document }: props) {
  const [toggle, setToggle] = useState(false);
  const [iscCopied, setIscCopied] = useState(false);

  const [isPublished, setIsPublished] = useState(document.isPublished);
  const updateNote = useMutation(api.documents.update);
  const publishHandle = async () => {
    const documentUpdated = await updateNote({
      documentId: document._id,
      isPublished: !isPublished,
    });
    setIsPublished((prev) => !prev);
  };
  const copyHandle = () => {
    setIscCopied(true);
    navigator.clipboard.writeText(`/published/${document._id}`);
    setTimeout(() => {
      setIscCopied(false);
    }, 3000);
  };
  return (
    <div className="flex gap-4 text-lg font-semibold  relative">
      <button
        onClick={() => setToggle((prev) => !prev)}
        className="text-blue-700 hover:text-blue-800 transition-all flex gap-2 items-center "
      >
        <Image
          src={"/publish-light.png"}
          width={20}
          height={20}
          alt="publish"
          className={isPublished ? "block" : "hidden"}
        />
        <p>Publish</p>
      </button>
      <div
        className={`${
          toggle ? "flex" : "hidden"
        } absolute top-[100%] right-[80px] bg-white border rounded-xl shadow-xl py-6 px-8 flex-col gap-2 overflow-hidden`}
      >
        {!isPublished ? (
          <div className="flex flex-col gap-1  transition-all">
            <div className="flex flex-col justify-center items-center gap-1 text-xl">
              <Image
                src={"/publish-light.png"}
                width={60}
                height={60}
                alt="publish"
                className={` grayscale-[1] ${isPublished ? "block" : "block"}`}
              />
              <p>publish this note</p>
            </div>
            <div className="text-gray-500 pb-3 text-base text-center">
              share your work with world
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3  transition-all">
            <div className="flex justify-center items-center gap-2 text-xl text-blue-600">
              <Image
                src={"/publish-light.png"}
                width={20}
                height={20}
                alt="publish"
                className={isPublished ? "block" : "block"}
              />
              <p>this note is live on web</p>
            </div>
            <div className="flex rounded-lg overflow-hidden items-stretch">
              <div className="p-2 bg-gray-200/60 border w-[256px] text-gray-900 text-ellipsis overflow-hidden whitespace-nowrap ">
                {`/published/${document._id}`}
              </div>
              <div
                onClick={copyHandle}
                className={`h-auto flex justify-center items-center p-2  ${
                  iscCopied
                    ? "cursor-default bg-gray-500"
                    : "cursor-pointer bg-gray-900"
                } `}
              >
                {iscCopied ? (
                  <Image
                    src={"/correct.png"}
                    width={30}
                    height={20}
                    alt="publish"
                    className={isPublished ? "block" : "block"}
                  />
                ) : (
                  <Image
                    src={"/link.png"}
                    width={30}
                    height={20}
                    alt="publish"
                    className={isPublished ? "block" : "block"}
                  />
                )}
              </div>
            </div>
          </div>
        )}

        <button
          onClick={publishHandle}
          className="w-[300px] text-center p-2 bg-gray-900 text-white font-semibold rounded-md shadow-md "
        >
          {isPublished ? "UnPublish" : "Publish"}
        </button>
      </div>
      <button className="text-red-800 hover:text-red-900 transition-all  ">
        Delete
      </button>
    </div>
  );
}

export default DocFunctionally;
