"use client";
import React, { useEffect, useRef, useState } from "react";
import TrashPopUp from "../_PopUpModel/TrashPopUp";
import Feature from "./Feature";
type props = {
  activeFeature: string;
};

function Trash({ activeFeature }: props) {
  const PopupRef = useRef<React.ElementRef<"div">>(null);
  const PopUpOpenHandle = () => {
    PopupRef.current!.style.transform = "scale(1)";
    PopupRef.current!.parentElement!.style.display = "flex";
    document.body.style.opacity = "0px";
  };
  useEffect(() => {
    if (activeFeature == "t") {
      PopUpOpenHandle();
    }
  }, [activeFeature]);
  return (
    <div>
      <Feature
        onClick={PopUpOpenHandle}
        icon={"trash"}
        text={"Trash"}
        letter="x"
      />
      <TrashPopUp PopupRef={PopupRef} />
    </div>
  );
}

export default Trash;
