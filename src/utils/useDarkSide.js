import { useState, useEffect } from "react";

export default function useDarkSide() {
  const [theme, setTheme] = useState(localStorage.theme);

  const colorTheme = "dark";

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(colorTheme);
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme, colorTheme]);

  return [colorTheme, setTheme];
}
