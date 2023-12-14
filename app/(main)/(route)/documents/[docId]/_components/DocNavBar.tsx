"use client";
import { Id } from "@/convex/_generated/dataModel";
import NameDoc from "./NameDoc";
import DocFunctionally from "./DocFunctionalty";
import Banner from "./Banner";

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
    <div className="w-full flex flex-col items-center relative gap-2">
      <div className="w-full flex justify-between items-center px-4  ">
        <NameDoc
          docIcon={document.icon!}
          docId={document._id}
          docTitle={document.title}
          size="small"
        />
        <DocFunctionally document={document} />
      </div>
      {document.isArchive && <Banner document={document} />}
    </div>
  );
}

export default DocNavBar;
