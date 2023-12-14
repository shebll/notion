"use client";
import React from "react";
import Image from "next/image";

import { SingleImageDropzone } from "@/app/(main)/_components/single-image";
import { useEdgeStore } from "@/app/lib/edgestore";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useState } from "react";

type props = {
  coverImage: string;
  docId: Id<"documents">;
};
function Cover({ coverImage, docId }: props) {
  const [toggle, setToggle] = useState<boolean>(false);
  const [file, setFile] = useState<File>();
  const [url, setUrl] = useState<string>(coverImage);

  const { edgestore } = useEdgeStore();
  const removeCover = useMutation(api.documents.removeCover);
  const updateNote = useMutation(api.documents.update);

  const deleteImage = async () => {
    console.log(url);
    if (!!url) {
      await edgestore.publicFiles.delete({ url });
    }
    await removeCover({
      documentId: docId,
    });
  };
  const onChange = async (file?: File) => {
    deleteImage();
    if (file) {
      setFile(file);
      const res = await edgestore.publicFiles.upload({ file });
      await updateNote({
        documentId: docId,
        coverImage: res.url,
      });
      setUrl(res.url);
      setToggle(false);
    }
  };
  return (
    <div
      className={`w-full relative md:h-[36vh] overflow-hidden bg-gray-200 ${
        !coverImage && "h-[12vh]"
      }`}
    >
      <Image
        src={coverImage}
        alt="cover"
        width={1600}
        height={300}
        className="object-cover w-full"
      />
      <div className="transition-all absolute right-4 bottom-5 flex  gap-4 items-center">
        <button
          onClick={() => setToggle(true)}
          className="w-fit px-3 py-1 border rounded-xl backdrop-blur-sm text-white font-bold "
        >
          update Image
        </button>
        <button
          onClick={deleteImage}
          className="w-fit px-3 py-1 border rounded-xl backdrop-blur-sm text-white font-bold  "
        >
          Delete Cover
        </button>
        {toggle && (
          <div className="fixed flex h-screen w-screen inset-0 z-[99999] justify-center items-center ">
            <div className="w-[340px] bg-white z-[222] p-6 border rounded-xl shadow-xl flex flex-col justify-center items-center gap-6">
              <h1 className="text-2xl font-semibold ">Select Cover Image</h1>
              <SingleImageDropzone
                className="bg-white w-[300px]"
                value={file}
                onChange={onChange}
              />
            </div>
            <div
              onClick={() => setToggle(false)}
              className="fixed z-[0] backdrop-blur-[2px] h-screen w-screen inset-0"
            ></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cover;
