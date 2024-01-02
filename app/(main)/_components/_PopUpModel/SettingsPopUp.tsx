"use client";
import { RefObject } from "react";
import Image from "next/image";
import Themes from "@/components/Themes";

type props = {
  PopupRef: RefObject<HTMLDivElement>;
  closePopup: () => void;
};
function SettingsPopUp({ PopupRef, closePopup }: props) {
  return (
    <div className="w-full h-screen backdrop-blur-[2px] fixed inset-0 z-[9999] hidden justify-center items-center p-4">
      <div onClick={closePopup} className="absolute w-full h-full z-0" />
      <div
        ref={PopupRef}
        className="px-6 py-4 bg-gray-200 shadow-2xl border-2 rounded-xl  scale-0 flex flex-col gap-4 justify-center items-center z-10 overflow-hidden max-w-[400px]"
      >
        <div
          onClick={closePopup}
          role="button"
          className="absolute top-2 right-2  p-1 rounded-sm"
        >
          <Image
            src={"/dropdown-light.png"}
            width={18}
            height={18}
            alt="close"
          />
        </div>
        <p className="text-2xl font-bold text-gray-800">My Settings !</p>

        <hr className=" bg-gray-500 h-[2px] w-full" />
        <div className="flex justify-center items-center">
          <div className="flex  flex-col gap-1">
            <h1 className="text-lg font-medium">Appearance</h1>
            <p className="text-gray-700">
              Customize how Jotion looks on your device
            </p>
          </div>
          <div className="">
            <Themes />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsPopUp;
