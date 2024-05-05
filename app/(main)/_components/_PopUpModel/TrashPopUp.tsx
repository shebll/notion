"use client";
import { RefObject, useState } from "react";
import Image from "next/image";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

import DocumentItem from "../_SideBarFeatures/DocumentItem";
type props = {
  PopupRef: RefObject<HTMLDivElement>;
  closePopup: () => void;
};
function TrashPopUp({ PopupRef, closePopup }: props) {
  const getTrash = useQuery(api.documents.getTrash);

  const [searchNote, setSearchNote] = useState<string>("");
  const filteredDocuments = getTrash?.filter((item) => {
    return item.title.toLowerCase().includes(searchNote.toLowerCase());
  });
  return (
    <div className="w-full h-screen backdrop-blur-[2px] fixed inset-0 z-[9999] hidden justify-center items-center">
      <div onClick={closePopup} className="absolute w-full h-full z-0" />
      <div
        ref={PopupRef}
        className="px-6 py-4 bg-gray-200  dark:bg-[#474747] dark:text-white shadow-2xl border-2  rounded-xl scale-0 flex flex-col gap-4 justify-center items-center z-10 overflow-hidden max-w-[400px]"
      >
        <div
          onClick={closePopup}
          role="button"
          className="absolute top-2 right-2 p-1 rounded-sm"
        >
          <Image
            src={"/dropdown-light.png"}
            width={18}
            height={18}
            alt="close"
          />
        </div>
        <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">
          Search In Trash !
        </p>
        <div className="flex gap-2 items-center justify-start">
          <Image
            src={"/search-light.png"}
            width={24}
            height={24}
            alt="create note image"
            className="block dark:hidden "
          />
          <form className="flex justify-center items-center flex-row gap-2 ">
            <input
              onChange={(e) => {
                setSearchNote(e.target.value);
              }}
              type="text"
              required
              className=" outline-none bg-gray-100 dark:bg-[#575757] dark:text-white rounded-md px-3 py-1"
              value={searchNote}
            />
          </form>
        </div>
        <div className="w-full flex justify-start flex-col gap-1 h-[200px] overflow-auto">
          {filteredDocuments?.map((document) => (
            <div key={document._id} onClick={closePopup}>
              <DocumentItem document={document} Trash={true} level={0} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TrashPopUp;
