"use client";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import Image from "next/image";
import { RefObject, useState } from "react";
import { toast } from "sonner";

type props = {
  PopupRef: RefObject<HTMLDivElement>;
};

function AddPopUp({ PopupRef }: props) {
  const [noteName, setNoteName] = useState<string>("");
  const create = useMutation(api.documents.create);

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
    <div className="w-full h-screen backdrop-blur-sm fixed inset-0 z-[9999] hidden justify-center items-center">
      <div onClick={closePopup} className="absolute w-full h-full z-0" />
      <div
        ref={PopupRef}
        className="px-6 py-4 bg-gray-200 rounded-xl shadow-2xl scale-0 flex flex-col gap-4 justify-center items-center z-10 overflow-hidden"
      >
        <div
          onClick={closePopup}
          role="button"
          className="absolute bg-gray-300  top-0 right-0 p-1 rounded-sm"
        >
          <Image
            src={"/dropdown-light.png"}
            width={18}
            height={18}
            alt="close"
          />
        </div>
        <p className="text-2xl font-bold text-gray-800">Enter A Name !</p>
        <Image
          src={"/documents.png"}
          width={250}
          height={260}
          alt="create note image"
          className="block dark:hidden ml-[17px]"
        />
        <form
          onSubmit={(e) => {
            createNote(e);
          }}
          className="flex justify-center items-center flex-col gap-2 "
        >
          <input
            onChange={(e) => {
              setNoteName(e.target.value);
            }}
            type="text"
            required
            placeholder="New Note"
            className="outline-none bg-gray-50 rounded-xl px-3 py-1"
            value={noteName}
          />
          <button
            type="submit"
            className=" uppercase bg-green-500 text-white font-bold w-full rounded-xl px-3 py-1 shadow-lg"
          >
            add
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddPopUp;
