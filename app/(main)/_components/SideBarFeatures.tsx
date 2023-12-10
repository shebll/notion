"use client";
import React, { useEffect, useState } from "react";
import UserItem from "./_SideBarFeatures/UserItem";
import AddNote from "./_SideBarFeatures/AddNote";
import Search from "./_SideBarFeatures/Search";
import DocumentList from "./_SideBarFeatures/DocumentList";
import Trash from "./_SideBarFeatures/Trash";
import Settings from "./_SideBarFeatures/Settings";

type stateFeature = "a" | "x" | "f" | "s" | "";

function SideBarFeatures() {
  const [activeFeature, setActiveFeature] = useState<stateFeature>("");
  // const handleShortcut = (letter: string) => {
  //   switch (letter) {
  //     case "a":
  //       setActiveFeature("AddNote");
  //     case "s":
  //       setActiveFeature("Settings");
  //       break;
  //     case "f":
  //       setActiveFeature("Search");
  //       break;
  //     case "x":
  //       setActiveFeature("Trash");
  //       break;
  //     default:
  //       setActiveFeature("");
  //       break;
  //   }
  // };
  // useEffect(() => {
  //   const handleKeyPress = (event: KeyboardEvent) => {
  //     if (
  //       event.ctrlKey &&
  //       (event.key === "a" ||
  //         event.key === "x" ||
  //         event.key === "s" ||
  //         event.key === "f")
  //     ) {
  //       event.preventDefault();
  //       setActiveFeature(event.key);
  //     }
  //   };
  //   document.addEventListener("keydown", handleKeyPress);
  //   return () => {
  //     document.removeEventListener("keydown", handleKeyPress);
  //   };
  // }, []);

  return (
    <>
      <UserItem />
      <AddNote activeFeature={activeFeature} />
      <Settings activeFeature={activeFeature} />
      <Search activeFeature={activeFeature} />
      <hr className="h-1 bg-black/5" />
      <DocumentList />
      <hr className="h-1 bg-black/5" />
      <AddNote activeFeature={activeFeature} />
      <Trash activeFeature={activeFeature} />
    </>
  );
}

export default SideBarFeatures;
