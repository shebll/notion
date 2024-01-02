"use client";
import React, { useEffect, useState } from "react";
import UserItem from "./_SideBarFeatures/UserItem";
import AddNote from "./_SideBarFeatures/AddNote";
import Search from "./_SideBarFeatures/Search";
import DocumentList from "./_SideBarFeatures/DocumentList";
import Trash from "./_SideBarFeatures/Trash";
import Settings from "./_SideBarFeatures/Settings";
import { useActiveFeature } from "@/hocks/use-activeFeature";

function SideBarFeatures() {
  const { setActiveFeature } = useActiveFeature((state) => state);
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (
        event.ctrlKey &&
        (event.key === "a" ||
          event.key === "x" ||
          event.key === "s" ||
          event.key === "f")
      ) {
        event.preventDefault();
        setActiveFeature(event.key);
      }
    };
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [setActiveFeature]);

  return (
    <>
      <UserItem />
      <AddNote />
      <Settings />
      <Search />
      <hr className="h-1 bg-black/5" />
      <DocumentList />
      <hr className="h-1 bg-black/5" />
      <AddNote />
      <Trash />
    </>
  );
}

export default SideBarFeatures;
