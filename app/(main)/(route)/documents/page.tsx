"use client";
import Button from "@/app/(marketing)/_components/button";
import { useUser } from "@clerk/clerk-react";
import Image from "next/image";
import React from "react";

function Documents() {
  const { user } = useUser();
  return (
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
        <Button buttonText={"Make Note"} />
      </div>
    </div>
  );
}

export default Documents;
