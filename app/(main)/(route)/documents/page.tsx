"use client";
import Image from "next/image";
import React, { ElementRef, useRef, useState } from "react";

import PopUp from "../../_components/PopUp";
import Button from "@/app/(marketing)/_components/button";

import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

function Documents() {
  const PopupRef = useRef<ElementRef<"div">>(null);
  const [noteName, setNoteName] = useState<string>("");

  const { user } = useUser();
  const create = useMutation(api.documents.create);

  const PopUpHandle = () => {
    PopupRef.current!.style.transform = "scale(1)";
    PopupRef.current!.parentElement!.style.display = "flex";
    document.body.style.opacity = "0px";
  };
  const closePopup = () => {
    PopupRef.current!.style.transform = "scale(0)";
    PopupRef.current!.parentElement!.style.display = "none";
  };
  const createNote = (e: React.FormEvent<HTMLFormElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setNoteName("");
    const promise = create({ title: noteName });
    toast.promise(promise, {
      loading: "Making New Note ....",
      success: "New Note Created",
      error: "Failed Try Agin",
    });
    PopupRef.current!.style.transform = "scale(0)";
    PopupRef.current!.parentElement!.style.display = "none";
  };

  return (
    <>
      <div className="h-screen flex justify-center items-center flex-col gap-8">
        <Image
          src={"/empty.png"}
          width={350}
          height={350}
          alt="create note image"
          className="block dark:hidden"
        />
        <Image
          src={"/empty-dark.png"}
          width={350}
          height={350}
          alt="create note image"
          className="hidden dark:block"
        />
        <div className="flex justify-center text-center items-center flex-col gap-4">
          <h2 className="text-xl font-semibold ">
            Welcome to {user?.firstName}&apos; jotion
          </h2>
          <div onClick={PopUpHandle}>
            <Button buttonText={"Make Note"} />
          </div>
        </div>
      </div>
      <PopUp
        noteName={noteName}
        setNoteName={setNoteName}
        PopupRef={PopupRef}
        createNote={createNote}
        closePopup={closePopup}
      />
    </>
  );
}

export default Documents;
