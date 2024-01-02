"use client";
import React, { useEffect, useRef, useState } from "react";
import Feature from "./Feature";
import AddPopUp from "../_PopUpModel/AddPopUp";
import { useActiveFeature } from "@/hocks/use-activeFeature";

function AddNote() {
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
    if (activeFeature === "a") {
      PopUpHandle();
    }
  }, [activeFeature]);
  return (
    <>
      <Feature
        onClick={PopUpHandle}
        icon={"add"}
        text={"New Note"}
        letter="a"
      />
      <AddPopUp PopupRef={PopupRef} closePopup={closePopup} />
    </>
  );
}

export default AddNote;
