"use client";
import React, { useEffect, useRef, useState } from "react";
import TrashPopUp from "../_PopUpModel/TrashPopUp";
import Feature from "./Feature";
import { stateFeature } from "./types/activeFeature";
import { useActiveFeature } from "@/hocks/use-activeFeature";

function Trash() {
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
    if (activeFeature === "x") {
      PopUpHandle();
    }
  }, [activeFeature]);
  return (
    <div>
      <Feature onClick={PopUpHandle} icon={"trash"} text={"Trash"} letter="x" />
      <TrashPopUp PopupRef={PopupRef} closePopup={closePopup} />
    </div>
  );
}

export default Trash;
