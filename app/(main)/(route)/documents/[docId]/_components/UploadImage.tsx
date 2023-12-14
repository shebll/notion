"use client";

import { SingleImageDropzone } from "@/app/(main)/_components/single-image";
import { useEdgeStore } from "@/app/lib/edgestore";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useState } from "react";
type props = {
  docId: Id<"documents">;
};
function UploadImage({ docId }: props) {
  const [toggle, setToggle] = useState<boolean>(false);
  const [file, setFile] = useState<File>();
  const { edgestore } = useEdgeStore();
  const updateNote = useMutation(api.documents.update);

  const onChange = async (file?: File) => {
    if (file) {
      setFile(file);
      const res = await edgestore.publicFiles.upload({ file });
      await updateNote({
        documentId: docId,
        coverImage: res.url,
      });
      setToggle(false);
    }
  };
  return (
    <div className="relative">
      <button
        onClick={() => setToggle(true)}
        className="w-fit px-3 py-1 border rounded-xl"
      >
        upload image
      </button>
      {toggle && (
        <>
          <div className="w-[340px] absolute top-[10px] right-[101%] z-[99999] p-6 border rounded-xl shadow-xl flex flex-col justify-center items-center gap-6">
            <h1 className="text-2xl font-semibold ">Select Cover Image</h1>
            <SingleImageDropzone
              className="bg-white w-[300px]"
              value={file}
              onChange={onChange}
            />
          </div>
          <div
            onClick={() => setToggle(false)}
            className="fixed z-[9999] backdrop-blur-[2px] h-screen w-screen inset-0"
          ></div>
        </>
      )}
    </div>
  );
}

export default UploadImage;
