import Image from "next/image";
import React from "react";

function Heros() {
  return (
    <div className="flex flex-row justify-center items-center">
      <div className="w-[220px] sm:w-[450px]">
        <Image
          src={"/documents.png"}
          alt="documents"
          width={450}
          height={338}
          className={"block dark:hidden"}
        />
        <Image
          src={"/documents-dark.png"}
          alt="documents"
          width={450}
          height={338}
          className={"hidden dark:block"}
        />
      </div>
      <div className="hidden lg:block">
        <Image
          src={"/reading.png"}
          alt="reading"
          width={450}
          height={338}
          className={"block dark:hidden"}
        />
        <Image
          src={"/reading-dark.png"}
          alt="reading"
          width={450}
          height={338}
          className={"hidden dark:block"}
        />
      </div>
    </div>
  );
}

export default Heros;
