"use client";
import React, { useRef, useState } from "react";
import Feature from "./Feature";
import SearchPopUp from "../_PopUpModel/SearchPopUp";

type props = {
  activeFeature: string;
};
function Search({ activeFeature }: props) {
  const PopupRef = useRef<React.ElementRef<"div">>(null);
  const PopUpHandle = () => {
    PopupRef.current!.style.transform = "scale(1)";
    PopupRef.current!.parentElement!.style.display = "flex";
    document.body.style.opacity = "0px";
  };
  if (activeFeature == "f") {
    PopUpHandle();
  }
  return (
    <div>
      <Feature
        onClick={PopUpHandle}
        icon={"search"}
        text={"Find Doc"}
        letter="F"
      />
      <SearchPopUp PopupRef={PopupRef} />
    </div>
  );
}

export default Search;
