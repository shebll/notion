"use client";
import { RefObject, useState } from "react";
import Image from "next/image";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

type props = {
  PopupRef: RefObject<HTMLDivElement>;
};
function SearchPopUp({ PopupRef }: props) {
  const getDocuments = useQuery(api.documents.getDocuments);
  const [searchNote, setSearchNote] = useState<string>("");
  const filteredDocuments = getDocuments?.filter((item) => {
    return item.title.toLowerCase().includes(searchNote.toLowerCase());
  });

  const closePopup = () => {
    PopupRef.current!.style.transform = "scale(0)";
    PopupRef.current!.parentElement!.style.display = "none";
  };

  return (
    <div className="w-full h-screen backdrop-blur-sm fixed inset-0 z-[9999] hidden justify-center items-center">
      <div onClick={closePopup} className="absolute w-full h-full z-0" />
      <div
        ref={PopupRef}
        className="px-6 py-4 bg-gray-200 rounded-xl shadow-2xl scale-0 flex flex-col gap-4 justify-center items-center z-10 overflow-hidden max-w-[400px]"
      >
        <div
          onClick={closePopup}
          role="button"
          className="absolute bg-gray-300  top-0 right-0 p-1 rounded-sm"
        >
          <Image
            src={"/dropdown-light.png"}
            width={18}
            height={18}
            alt="close"
          />
        </div>
        <p className="text-2xl font-bold text-gray-800">
          Search In Documents !
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
              className=" outline-none bg-gray-50 rounded-md px-3 py-1"
              value={searchNote}
            />
          </form>
        </div>
        <div className="w-full flex justify-start flex-col gap-1 h-[200px] overflow-auto">
          {filteredDocuments?.map((document) => (
            <div key={document._id} className="gap-2">
              <div className="hover:bg-gray-300 transition-all">
                <div className="flex flex-row gap-1 items-center py-1 px-4">
                  {document.icon ? (
                    <div className="">{document.icon}</div>
                  ) : (
                    <div className="">
                      <Image
                        src={"/file-light.png"}
                        alt="file"
                        width={20}
                        height={20}
                      />
                    </div>
                  )}
                  <h1 className="flex-1 text-ellipsis overflow-hidden whitespace-nowrap ">
                    {document.title}
                  </h1>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchPopUp;
