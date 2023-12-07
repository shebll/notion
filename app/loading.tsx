import React from "react";
import Image from "next/image";

function loading() {
  return (
    <div className="h-screen flex justify-center items-center ">
      <Image src={"/spinner.gif"} width={30} height={30} alt="spinner" />
    </div>
  );
}

export default loading;
