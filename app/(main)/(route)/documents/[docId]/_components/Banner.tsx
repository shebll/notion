"use client";
import { useRouter } from "next/navigation";
import React from "react";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
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
function Banner({ document }: props) {
  const route = useRouter();
  const restore = useMutation(api.documents.unarchive);
  const remove = useMutation(api.documents.remove);
  const restoreNote = () => {
    const promise = restore({ documentId: document._id });
    toast.promise(promise, {
      loading: "Restore note ....",
      success: "Note restored forever!",
      error: "Failed to restore note.",
    });
  };
  const deleteNote = () => {
    const promise = remove({ documentId: document._id });
    route.push("/documents");
    toast.promise(promise, {
      loading: "remove note forever....",
      success: "Note removed forever!",
      error: "Failed to remove note.",
    });
  };
  return (
    <div className="bg-red-500 p-2 w-full flex  justify-center items-center gap-4">
      <h1 className="text-white font-semibold text-xl">
        This Document Is In Trash
      </h1>
      <button
        onClick={restoreNote}
        className=" px-6 py-1 rounded-2xl font-semibold border-2 border-gray-300 text-white"
      >
        Restore Note
      </button>
      <button
        onClick={deleteNote}
        className=" px-6 py-1 rounded-2xl font-semibold bg-transparent border-2 border-gray-300 text-white"
      >
        Delete Forever
      </button>
    </div>
  );
}

export default Banner;
