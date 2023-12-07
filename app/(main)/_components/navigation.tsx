"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { ElementRef, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import UserItem from "./UserItem";
import Logo from "@/app/(marketing)/_components/logo";

function Navigation() {
  const pathname = usePathname();
  const isMobile = useMediaQuery("(max-width:768px");

  const sideBarRef = useRef<ElementRef<"aside">>(null);
  const navBarRef = useRef<ElementRef<"div">>(null);

  const [isResetting, setIsResetting] = useState(false);
  const [isCollapse, setIsCollapse] = useState(isMobile);

  useEffect(() => {
    if (isMobile) {
      setIsCollapse(true);
      if (sideBarRef.current && navBarRef.current) {
        sideBarRef.current.style.width = `0px`;
        navBarRef.current.style.setProperty("left", `0px`);
        navBarRef.current.style.setProperty("width", `calc(100%)`);
      }
    } else {
      setIsCollapse(false);
      if (sideBarRef.current && navBarRef.current) {
        sideBarRef.current.style.width = `256px`;
        navBarRef.current.style.setProperty("left", `256px`);
        navBarRef.current.style.setProperty("width", `calc(100% - 256px)`);
      }
    }
  }, [isMobile]);
  useEffect(() => {
    if (isMobile) {
      setIsCollapse(true);
      if (sideBarRef.current && navBarRef.current) {
        sideBarRef.current.style.width = `0px`;
        navBarRef.current.style.setProperty("left", `0px`);
        navBarRef.current.style.setProperty("width", `calc(100%)`);
      }
    } else {
      setIsCollapse(false);
      if (sideBarRef.current && navBarRef.current) {
        sideBarRef.current.style.width = `256px`;
        navBarRef.current.style.setProperty("left", `256px`);
        navBarRef.current.style.setProperty("width", `calc(100%-256px)`);
      }
    }
  }, [isMobile, pathname]);

  const handleMouseMove = (e: MouseEvent) => {
    let newWidth = e.clientX;
    // console.log(newWidth);
    if (sideBarRef.current && navBarRef.current) {
      if (newWidth < 256) newWidth = 256;
      if (newWidth > 560) newWidth = 560;

      sideBarRef.current.style.width = `${newWidth}px`;
      navBarRef.current.style.setProperty("left", `${newWidth}px`);
      navBarRef.current.style.setProperty(
        "width",
        `calc(100% - ${newWidth}px)`
      );
      console.log(navBarRef.current.style.getPropertyValue("width"));
    }
  };
  const handleMouseUp = (e: MouseEvent) => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };
  const collapseHandle = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setIsCollapse(true);
    setIsResetting(true);
    if (sideBarRef.current && navBarRef.current) {
      sideBarRef.current.style.width = `0px`;
      navBarRef.current.style.setProperty("left", `0px`);
      navBarRef.current.style.setProperty("width", "calc(100% - 0px)");
    }
    setTimeout(() => {
      setIsResetting(false);
    }, 500);
  };
  const openHandle = () => {
    setIsCollapse(false);
    setIsResetting(true);
    if (sideBarRef.current && navBarRef.current) {
      if (isMobile) {
        sideBarRef.current.style.width = `100%`;
        navBarRef.current.style.setProperty("left", `0px`);
        navBarRef.current.style.setProperty("width", `calc(100% - 100%)`);
      } else {
        sideBarRef.current.style.width = `256px`;
        navBarRef.current.style.setProperty("left", `256px`);
        navBarRef.current.style.setProperty("width", `calc(100% - 256px)`);
      }
    }
    setTimeout(() => {
      setIsResetting(false);
    }, 500);
  };
  const resetWidth = () => {
    setIsResetting(true);
    if (sideBarRef.current && navBarRef.current) {
      if (isMobile) {
        setIsCollapse(true);
        sideBarRef.current.style.width = `0px`;
        navBarRef.current.style.setProperty("left", `0px`);
        navBarRef.current.style.setProperty("width", `calc(100%)`);
      } else {
        sideBarRef.current.style.width = `256px`;
        navBarRef.current.style.setProperty("left", `256px`);
        navBarRef.current.style.setProperty("width", `calc(100% - 256px)`);
      }
    }
    setTimeout(() => {
      setIsResetting(false);
    }, 500);
  };
  return (
    <>
      <aside
        ref={sideBarRef}
        className={`group/sidebar h-full bg-gray-200 flex flex-col w-64 z-[9999] gap-4  overflow-y-auto
        ${isMobile && "w-0"}${
          isResetting && "transition-all duration-500"
        } absolute`}
      >
        <span
          onClick={collapseHandle}
          role="button"
          className={`p-2 hover:bg-gray-300 rounded-md hover:shadow-lg w-fit absolute right-4 top-3 transition opacity-0 group-hover/sidebar:opacity-[1]
          ${isMobile && "opacity-[1]"}`}
        >
          <Image src={"/arrow-light.png"} alt="arrow" width={14} height={14} />
        </span>
        <div className="">
          <UserItem />
        </div>
        <div className="">
          <p>Documents</p>
        </div>
        <div
          onClick={resetWidth}
          onMouseDown={(e) => {
            !isMobile && handleMouseDown(e);
          }}
          className={`absolute w-2 h-full bg-gray-300 transition-all opacity-0 right-0 top-0 group-hover/sidebar:opacity-[1] cursor-ew-resize
          ${isResetting && "transition-all duration-500"} `}
        />
      </aside>
      <div
        ref={navBarRef}
        className={`absolute  top-0 z-[9999] transition
        ${
          isMobile ? "w-full left-0" : "left-[256px] w-[calc(100%-256px)]"
        } z-[999] p-4 flex justify-between items-center`}
      >
        <nav>
          {isCollapse && (
            <span role="button" onClick={openHandle} className="">
              <Image
                src={"/menu-light.png"}
                width={20}
                height={20}
                alt="menu"
              />
            </span>
          )}
        </nav>
        <Logo />
      </div>
    </>
  );
}

export default Navigation;
