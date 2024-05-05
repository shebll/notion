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
      className="px-4 py-2 bg-gray-200 hover:bg-gray-100 text-gray-700 dark:bg-[#474747] dark:hover:bg-[#4e4e4e] dark:text-white transition-all cursor-pointer w-full flex justify-between items-center"
    >
      <div className="flex gap-2">
        <Image
          src={`/${icon}-light.png`}
          width={20}
          height={20}
          alt={text}
          className=" object-contain"
        />
        <p className="text-base font-medium">{text}</p>
      </div>
      <div className="flex gap-1 bg-gray-200 dark:bg-[#5c5c5c] dark:hover:bg-[#707070] dark:text-white px-[2px] py-[1px] rounded-md items-center">
        <Image
          src={`/${userAgent == "win" ? "ctrl-light" : "command-light"}.png`}
          width={16}
          height={16}
          alt={text}
          className="object-contain block dark:hidden"
        />
        <Image
          src={`/${userAgent == "win" ? "ctrl-dark" : "command-dark"}.png`}
          width={16}
          height={16}
          alt={text}
          className="object-contain hidden dark:block"
        />
        <p className="text-base font-medium text-gray-600 dark:text-gray-200 uppercase">
          {letter}
        </p>
      </div>
    </button>
  );
}

export default Feature;
