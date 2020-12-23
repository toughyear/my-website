import Link from "next/link";
import { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
export default function Nav() {
  const onLoadTheme =
    typeof localStorage !== "undefined" && localStorage.getItem("BLOG_THEME");
  const [theme, setTheme] = useState(onLoadTheme);
  const [mounted, setMounted] = useState(false);
  const switchTheme = () => {
    const setTo = theme === "dark" ? "light" : "dark";

    setTheme(setTo);
  };

  useEffect(() => {
    if (onLoadTheme) return;

    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);

    localStorage.setItem("BLOG_THEME", theme);

    setMounted(true);
  }, [theme]);

  return (
    <nav className="z-10 sticky top-0 bg-bg-color bg-opacity-100 p-8  ">
      <ul className="flex items-center justify-between ">
        <li>
          <Link href="/">
            <a className=" nav-link">Home</a>
          </Link>
        </li>
        <ul className="flex items-center justify-between space-x-4">
          <Link href="/blog">
            <a className=" nav-link">Blog</a>
          </Link>
          <Link href="/journal">
            <a className=" nav-link">Journal</a>
          </Link>
          <button
            className="theme-switch-button"
            style={{ outline: "none" }}
            onClick={() => switchTheme()}
          >
            {theme === "dark" ? <FiSun /> : <FiMoon />}
          </button>
        </ul>
      </ul>
    </nav>
  );
}
