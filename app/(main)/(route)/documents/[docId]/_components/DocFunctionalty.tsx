"use client";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
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
  const [isArchive, setIsArchive] = useState(document.isArchive);
  const [isPublished, setIsPublished] = useState(document.isPublished);
  const update = useMutation(api.documents.update);
  const archive = useMutation(api.documents.archive);
  useEffect(() => {
    setIsArchive(document.isArchive);
  }, [document.isArchive]);
  const archiveNote = () => {
    if (isArchive) return;
    const promise = archive({ documentId: document._id });
    toast.promise(promise, {
      loading: "Moving to trash...",
      success: "Note moved to trash!",
      error: "Failed to archive note.",
    });
    setIsArchive(true);
  };
  const publishHandle = async () => {
    const documentUpdated = update({
      documentId: document._id,
      isPublished: !isPublished,
    });
    setIsPublished((prev) => !prev);
    if (!isPublished) {
      toast.promise(documentUpdated, {
        loading: "Publish This Note...",
        success: "Note Published Live!",
        error: "Failed to Publish note.",
      });
    } else {
      toast.promise(documentUpdated, {
        loading: "UnPublish This Note...",
        success: "Note UnPublished on live web!",
        error: "Failed to UnPublish Note.",
      });
    }
  };
  const copyHandle = () => {
    setIscCopied(true);
    navigator.clipboard.writeText(`/preview/${document._id}`);
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
        } absolute top-[100%] md:right-[80px] right-[0px] z-[99999] bg-white border-[2px] border-gray-200 rounded-xl shadow-xl py-6 px-8 flex-col gap-2 overflow-hidden`}
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
                {`/preview/${document._id}`}
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
      <div
        onClick={() => setToggle(false)}
        className={` fixed h-screen w-screen z-[9999] backdrop-blur-[2px] left-0 top-0 ${
          toggle ? "flex" : "hidden"
        }`}
      ></div>
      <button
        onClick={archiveNote}
        className={`text-red-800 hover:text-red-900 transition-all ${
          isArchive && "cursor-not-allowed text-gray-400 hover:text-gray-400 "
        }`}
      >
        Delete
      </button>
    </div>
  );
}

export default DocFunctionally;
