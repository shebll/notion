"use client";
import React, { useEffect, useRef } from "react";
import Feature from "./Feature";
import SettingsPopUp from "../_PopUpModel/SettingsPopUp";
import { useActiveFeature } from "@/hocks/use-activeFeature";

function Settings() {
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
    if (activeFeature === "s") {
      PopUpHandle();
    }
  }, [activeFeature]);
  return (
    <>
      <Feature
        onClick={PopUpHandle}
        icon={"setting"}
        text={"Setting"}
        letter="s"
      />
      <SettingsPopUp PopupRef={PopupRef} closePopup={closePopup} />
    </>
  );
}

export default Settings;
