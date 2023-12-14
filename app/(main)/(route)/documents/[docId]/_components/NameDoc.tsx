"use client";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

import { useMutation } from "convex/react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import Image from "next/image";
import React, {
  ElementRef,
  LegacyRef,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
type props = {
  docIcon: string;
  docTitle: string;
  docId: Id<"documents">;
  size: string;
};
function NameDoc({ docIcon, docId, docTitle, size }: props) {
  const inputRef = useRef<ElementRef<"input">>(null);
  const [name, setName] = useState<string>(docTitle);
  const [icon, setIcon] = useState<string>(docIcon || "📂");
  const [toggle, setToggle] = useState<boolean>(false);

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const updateNote = useMutation(api.documents.update);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  const inInput = (value: string) => {
    setName(value);
    updateNote({
      documentId: docId,
      title: value,
    });
  };
  const handleIconChange = (icon: string) => {
    setIcon(icon);
    const documentUpdated = updateNote({
      documentId: docId,
      icon: icon,
    });
  };
  const unFocusHandle = () => {
    setIsEditing(false);
    updateNote({
      documentId: docId,
      title: name || "unnamed",
    });
  };
  const onEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      unFocusHandle();
    }
  };
  return (
    <div
      className={`flex gap-3 relative ${
        size == "large" ? "flex-col  items-start" : "item-center"
      }`}
    >
      <div
        role="button"
        onClick={() => setToggle((prev) => !prev)}
        className=""
      >
        <div
          className={`flex justify-center items-center ${
            size == "small" ? "text-[20px]" : "text-[60px]"
          }`}
        >
          {docIcon || icon}
        </div>
        {/* {icon ? (
          <div
            className={`flex justify-center items-center ${
              size == "small" ? "text-[20px]" : "text-[60px]"
            }`}
          >
            {docIcon}
          </div>
        ) }*/}
      </div>
      <div
        className={`z-[2] absolute top-[100%] ${toggle ? "block" : "hidden"} `}
      >
        <Picker
          data={data}
          onEmojiSelect={(data: any) => handleIconChange(data.native as string)}
        />
      </div>
      <div className={`relative ${size == "large" ? "h-[80px]" : "h-[30px]"}`}>
        <h2
          className={`cursor-pointer h-full flex items-center ${
            size == "small" ? "text-lg font-semibold" : "text-6xl font-bold"
          }`}
          onClick={() => setIsEditing(true)}
        >
          {docTitle}
        </h2>
        <input
          ref={inputRef}
          type="text"
          onKeyDown={onEnterKey}
          onChange={(e) => inInput(e.target.value)}
          onBlur={unFocusHandle}
          value={name}
          className={`outline-none  text-gray-500 absolute top-0  ${
            size == "large"
              ? "h-[-webkit-fill-available] "
              : "h-[-webkit-fill-available]  "
          }
            ${isEditing ? "block" : "hidden"} ${
            size == "small" ? "text-lg font-semibold" : "text-6xl font-bold"
          }`}
        />
      </div>
    </div>
  );
}

export default NameDoc;
