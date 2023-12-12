"use client";
import Image from "next/image";
import React, { ElementRef, useRef, useState } from "react";

import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import AddPopUp from "../../_components/_PopUpModel/AddPopUp";

function Documents() {
  const PopupRef = useRef<ElementRef<"div">>(null);
  const [noteName, setNoteName] = useState<string>("");

  const { user } = useUser();
  const create = useMutation(api.documents.create);

  const PopUpHandle = () => {
    PopupRef.current!.style.transform = "scale(1)";
    PopupRef.current!.parentElement!.style.display = "flex";
    document.body.style.opacity = "0px";
  };

  return (
    <>
      <div className="h-screen flex justify-center items-center flex-col gap-8">
        <Image
          src={"/empty.png"}
          width={350}
          height={263}
          alt="create note image"
          className="block dark:hidden"
        />
        <Image
          src={"/empty-dark.png"}
          width={350}
          height={263}
          alt="create note image"
          className="hidden dark:block"
        />
        <div className="flex justify-center text-center items-center flex-col gap-4">
          <h2 className="text-xl font-semibold ">
            Welcome to {user?.firstName}&apos; jotion
          </h2>
          <div onClick={PopUpHandle}>
            <button className="bg-slate-800 shadow-lg rounded-md text-white transition-all font-medium text-base py-1 px-3 focus:scale-95  hover:scale-105 hover:bg-slate-900 dark:text-slate-800 dark:bg-gray-200 dark:hover:bg-gray-50">
              Make Note
            </button>
          </div>
        </div>
      </div>
      <AddPopUp PopupRef={PopupRef} />
    </>
  );
}

export default Documents;
