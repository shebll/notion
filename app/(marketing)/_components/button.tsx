"use client";

import React from "react";

type props = {
  buttonText: string;
};
function Button({ buttonText }: props) {
  return (
    <div>
      <button className="bg-slate-800 shadow-lg rounded-md text-white transition-all font-medium text-base sm:text-lg py-2 px-4 focus:scale-95  hover:scale-105 hover:bg-slate-900 dark:text-slate-800 dark:bg-gray-200 dark:hover:bg-gray-50">
        {buttonText}
      </button>
    </div>
  );
}

export default Button;
