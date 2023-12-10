"use client";
import React, { useEffect, useRef, useState } from "react";
import Feature from "./Feature";
import AddPopUp from "../_PopUpModel/AddPopUp";

type props = {
  activeFeature: string;
};
function AddNote({ activeFeature }: props) {
  const PopupRef = useRef<React.ElementRef<"div">>(null);
  const PopUpHandle = () => {
    PopupRef.current!.style.transform = "scale(1)";
    PopupRef.current!.parentElement!.style.display = "flex";
    document.body.style.opacity = "0px";
  };
  if (activeFeature === "a") {
    PopUpHandle();
  }
  return (
    <>
      <Feature
        onClick={PopUpHandle}
        icon={"add"}
        text={"New Note"}
        letter="a"
      />
      <AddPopUp PopupRef={PopupRef} />
    </>
  );
}

export default AddNote;
