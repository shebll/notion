"use client";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

import { useMutation } from "convex/react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import React, { ElementRef, useEffect, useRef, useState } from "react";
import { useTitle } from "@/hocks/use-title";
type props = {
  docIcon: string;
  docTitle: string;
  docId: Id<"documents">;
  size: string;
};
function NameDoc({ docIcon, docId, docTitle, size }: props) {
  const inputRef = useRef<ElementRef<"input">>(null);
  const { title, setTitle } = useTitle((state) => state);
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
    setTitle(value);
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
    setToggle(false);
  };
  const unFocusHandle = () => {
    setIsEditing(false);
    updateNote({
      documentId: docId,
      title: title || "unnamed",
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
            size == "small" ? "text-[20px]" : "text-[40px] md:text-[60px]"
          }`}
        >
          {docIcon || icon}
        </div>
      </div>
      <div
        className={`fixed flex h-screen w-screen inset-0 z-[99999] justify-center items-center  ${
          toggle ? "block" : "hidden"
        } `}
      >
        <div className="z-[1]">
          <Picker
            data={data}
            onEmojiSelect={(data: any) =>
              handleIconChange(data.native as string)
            }
          />
        </div>
        <div
          onClick={() => setToggle(false)}
          className="fixed z-[0] backdrop-blur-[2px] h-screen w-screen inset-0"
        />
      </div>
      <div className={`relative ${size == "large" ? "h-[80px]" : "h-[30px]"}`}>
        <h2
          className={`cursor-pointer h-full flex items-center ${
            size == "small"
              ? "text-lg font-semibold"
              : "text-5xl md:text-6xl font-bold"
          }`}
          onClick={() => setIsEditing(true)}
        >
          {title}
        </h2>
        <input
          ref={inputRef}
          type="text"
          onKeyDown={onEnterKey}
          onChange={(e) => inInput(e.target.value)}
          onBlur={unFocusHandle}
          value={title}
          className={`outline-none  text-gray-500 absolute top-0 h-[-webkit-fill-available] ${
            size == "large" ? " w-[90vw] md:w-[50vw]" : " w-[60vw] "
          }
            ${isEditing ? "block" : "hidden"} ${
            size == "small"
              ? "text-lg font-semibold"
              : "text-5xl md:text-6xl font-bold"
          }`}
        />
      </div>
    </div>
  );
}

export default NameDoc;
