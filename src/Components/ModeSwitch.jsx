import React from "react";
import { switchTheme } from "../app/Slices/ThemeSlice.js";
import { useSelector, useDispatch } from "react-redux";
import { CiDark } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";

export default function ModeSwitch() {
  const { theme } = useSelector((s) => s.theme);

  const dispatch = useDispatch();

  return (
    <button onClick={() => dispatch(switchTheme())}>
      {theme === "light" ? <CiDark size={35} /> : <MdDarkMode size={35} />}
    </button>
  );
}
