"use client";
import React, { useEffect, useRef, useState } from "react";
import Feature from "./Feature";
import SearchPopUp from "../_PopUpModel/SearchPopUp";
import { useActiveFeature } from "@/hooks/use-activeFeature";

function Search() {
  const { activeFeature, setActiveFeature } = useActiveFeature(
    (state) => state
  );
  const PopupRef = useRef<React.ElementRef<"div">>(null);
  const PopUpHandle = () => {
    PopupRef.current!.style.transform = "scale(1)";
    PopupRef.current!.parentElement!.style.display = "flex";
    document.body.style.opacity = "0px";
  };
  const closePopup = () => {
    PopupRef.current!.style.transform = "scale(0)";
    PopupRef.current!.parentElement!.style.display = "none";
    setActiveFeature("");
  };
  useEffect(() => {
    if (activeFeature === "f") {
      PopUpHandle();
    }
  }, [activeFeature]);
  return (
    <div>
      <Feature
        onClick={PopUpHandle}
        icon={"search"}
        text={"Find Doc"}
        letter="F"
      />
      <SearchPopUp PopupRef={PopupRef} closePopup={closePopup} />
    </div>
  );
}

export default Search;
