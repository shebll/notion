"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import TrashPopUp from "./TrashPopUp";

function Trash() {
  const userAgent = navigator.userAgent.toLowerCase();
  const PopupRef = useRef<React.ElementRef<"div">>(null);
  const PopUpHandle = () => {
    PopupRef.current!.style.transform = "scale(1)";
    PopupRef.current!.parentElement!.style.display = "flex";
    document.body.style.opacity = "0px";
  };
  return (
    <div>
      <button
        onClick={PopUpHandle}
        className="px-4 py-2 bg-gray-200 hover:bg-gray-100 transition-all duration-500 cursor-pointer w-full flex justify-between items-center"
      >
        <div className="flex gap-4">
          <Image
            src={`/trash-light.png`}
            width={20}
            height={20}
            alt={"trash"}
            className=" object-contain"
          />
          <p className="text-base font-medium">Trash</p>
        </div>
        <div className="flex gap-1 bg-gray-200 px-[2px] py-[1px] rounded-md items-center">
          <Image
            src={`/${userAgent == "win" ? "ctrl-light" : "command-light"}.png`}
            width={16}
            height={16}
            alt={userAgent}
            className="object-contain"
          />
          <p className="text-base font-medium text-gray-600 uppercase">{"t"}</p>
        </div>
      </button>
      <TrashPopUp PopupRef={PopupRef} />
    </div>
  );
}

export default Trash;
