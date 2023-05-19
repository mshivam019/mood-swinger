import { useState, useEffect } from "react";

const useDarkSide = () => {
  const [colorTheme, setTheme] = useState(localStorage.theme || "dark");

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  useEffect(() => {
    localStorage.theme = colorTheme;
    if (colorTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [colorTheme]);

  return [colorTheme, setTheme];
};

export default useDarkSide;
