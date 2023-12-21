import React from "react";
export default function Loading() {
  return (
    <div className={`flex items-center justify-center h-screen `}>
      <div className=" animate-spin rounded-full border-dotted border-[5px] h-10 w-10 dark:border-black"></div>
    </div>
  );
}
