"use client";
import React, { useRef } from "react";
import Feature from "./Feature";
import SearchPopUp from "../_PopUpModel/SearchPopUp";
import SettingsPopUp from "../_PopUpModel/SettingsPopUp";

type props = {
  activeFeature: string;
};
function Settings({ activeFeature }: props) {
  const PopupRef = useRef<React.ElementRef<"div">>(null);
  const PopUpHandle = () => {
    PopupRef.current!.style.transform = "scale(1)";
    PopupRef.current!.parentElement!.style.display = "flex";
    document.body.style.opacity = "0px";
  };
  if (activeFeature == "s") {
    PopUpHandle();
  }
  return (
    <>
      <Feature
        onClick={PopUpHandle}
        icon={"setting"}
        text={"Setting"}
        letter="s"
      />
      <SettingsPopUp PopupRef={PopupRef} />
    </>
  );
}

export default Settings;
