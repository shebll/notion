import Image from "next/image";
import React from "react";

type props = {
  onClick: () => void;
  icon: string;
  text: string;
  letter: string;
};
function Feature({ onClick, icon, text, letter }: props) {
  const userAgent = navigator.userAgent.toLowerCase();
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-gray-200 hover:bg-gray-100 transition-all duration-500 cursor-pointer w-full flex justify-between items-center"
    >
      <div className="flex gap-4">
        <Image
          src={`/${icon}-light.png`}
          width={20}
          height={20}
          alt={text}
          className=" object-contain"
        />
        <p className="text-base font-medium">{text}</p>
      </div>
      <div className="flex gap-1 bg-gray-200 px-[2px] py-[1px] rounded-md items-center">
        <Image
          src={`/${userAgent == "win" ? "ctrl-light" : "command-light"}.png`}
          width={16}
          height={16}
          alt={text}
          className="object-contain"
        />
        <p className="text-base font-medium text-gray-600 uppercase">
          {letter}
        </p>
      </div>
    </button>
  );
}

export default Feature;
