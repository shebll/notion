"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
type Theme = "dark" | "light" | "-";
function Themes() {
  const [theme, setTheme] = useState<Theme>("-");
  const themeToggleHandle = () => {
    if (theme == "light") {
      setTheme("dark");
      window.localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    } else {
      setTheme("light");
      window.localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    }
  };
  const detectTheme = () => {
    const matches = window.matchMedia("(prefers-color-scheme: dark)");
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", ({ matches }) => {
        if (matches) {
          setTheme("dark");
          window.localStorage.setItem("theme", "dark");
          document.documentElement.classList.add("dark");
        } else {
          setTheme("light");
          window.localStorage.setItem("theme", "light");
          document.documentElement.classList.remove("dark");
        }
      });
    if (matches.matches) {
      setTheme("dark");
      window.localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    } else {
      setTheme("light");
      window.localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    }
  };
  useEffect(() => {
    const themeFromLocal = window.localStorage.getItem("theme") as Theme;
    if (themeFromLocal) {
      setTheme(themeFromLocal);
      document.documentElement.classList.add(themeFromLocal);
    } else {
      detectTheme();
    }
  }, []);
  return (
    <div>
      <button onClick={themeToggleHandle}>
        <Image src={`/${theme}.png`} alt="" width={30} height={30} />
      </button>
    </div>
  );
}

export default Themes;
