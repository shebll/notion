"use client";
import { Id } from "@/convex/_generated/dataModel";
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
function DocNavBar({ document }: props) {
  return (
    <div className="w-full flex justify-between items-center relative">
      <NameDoc
        docIcon={document.icon!}
        docId={document._id}
        docTitle={document.title}
      />
    </div>
  );
}

export default DocNavBar;
