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
};
function NameDoc({ docIcon, docId, docTitle }: props) {
  let size = "small";
  const inputRef = useRef<ElementRef<"input">>(null);
  const [name, setName] = useState<string>(docTitle);
  const [icon, setIcon] = useState<string>("");
  const [toggle, setToggle] = useState<boolean>(false);

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const updateNote = useMutation(api.documents.update);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);
  useEffect(() => {
    const documentUpdated = updateNote({
      documentId: docId,
      title: name,
    });
  }, [name]);
  const handleIconChange = (icon: string) => {
    setIcon(icon);
    const documentUpdated = updateNote({
      documentId: docId,
      icon: icon,
    });
  };
  const unFocusHandle = () => {
    setIsEditing(false);
    if (name === "") {
      setName("unnamed");
    }
  };
  return (
    <div className="flex items-center gap-3">
      <div
        role="button"
        onClick={() => setToggle((prev) => !prev)}
        className=""
      >
        {docIcon ? (
          <div className={`${size == "small" ? "text-[20px]" : "text-[60px]"}`}>
            {docIcon}
          </div>
        ) : (
          <div className="">
            {size == "small" ? (
              <Image
                src={"/file-light.png"}
                alt="file"
                width={20}
                height={20}
              />
            ) : (
              <Image
                src={"/file-light.png"}
                alt="file"
                width={20}
                height={20}
              />
            )}
          </div>
        )}
      </div>
      <div className={`absolute top-[100%] ${toggle ? "block" : "hidden"} `}>
        <Picker
          data={data}
          onEmojiSelect={(data: any) => handleIconChange(data.native as string)}
        />
      </div>
      <div className="relative h-[30px]">
        <h2
          className={` cursor-pointer ${
            size == "small" ? "text-lg font-semibold" : "text-6xl font-bold"
          }`}
          onClick={() => setIsEditing(true)}
        >
          {docTitle}
        </h2>
        <input
          ref={inputRef}
          type="text"
          onChange={(e) => setName(e.target.value)}
          onBlur={unFocusHandle}
          value={name}
          className={`outline-none  text-gray-500 absolute top-0
            ${isEditing ? "block" : "hidden"} ${
            size == "small" ? "text-lg font-semibold" : "text-6xl font-bold"
          }`}
        />
      </div>
    </div>
  );
}

export default NameDoc;
