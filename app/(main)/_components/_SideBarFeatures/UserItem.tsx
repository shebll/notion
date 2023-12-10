"use Client";

import { SignOutButton, useUser } from "@clerk/clerk-react";
import Image from "next/image";
import { useState } from "react";

function UserItem() {
  const [toggle, setToggle] = useState(false);
  const { user } = useUser();
  return (
    <div className="p-2">
      <div className="py-2 px-4 bg-gray-100 hover:bg-gray-100 rounded-md shadow-md flex flex-col gap-2 w-[calc(100%-35px);] ">
        <div className="flex justify-between items-center flex-row">
          <div className="flex flex-row gap-2 items-center ">
            <Image
              src={user?.imageUrl!}
              width={26}
              height={26}
              alt="userImage"
              className="rounded-full shadow-xl"
            />
            <h2 className=" font-medium">{user?.firstName}</h2>
          </div>
          <button onClick={() => setToggle((prev) => !prev)}>
            <Image
              src={"/dropdown-light.png"}
              width={16}
              height={16}
              alt="dropdown"
              className={` transition-all duration-700 ${
                !toggle && "rotate-45"
              }`}
            />
          </button>
        </div>
        <hr />
        <div
          className={`
        ${toggle ? "flex" : "hidden"} flex-col gap-2 items-start `}
        >
          <h2 className="font-medium">
            {user?.emailAddresses[0].emailAddress}
          </h2>
          <h2 className="font-medium">{user?.fullName}</h2>
          <SignOutButton />
        </div>
      </div>
    </div>
  );
}

export default UserItem;
