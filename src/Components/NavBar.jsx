import React from "react";
import ModeSwitch from "./ModeSwitch";
import Hamburger from "hamburger-react";
import Search from "./Search";
const NavBar = ({ toggleSideBar, setToggleSideBar }) => {
  return (
    <div className="sticky w-full flex-1 top-0 h-16 flex inset-0 justify-between px-3 items-center z-20 right-0 text-white backdrop-blur-md bg-blue-600/80 dark:bg-zinc-800/90">
      <div className="flex gap-3 md:hidden">
        <Hamburger toggled={toggleSideBar} toggle={setToggleSideBar} />
      </div>

      <div className="flex  relative  md:right-2 right-6">
        <ModeSwitch />
      </div>
      <div>
        <Search />
      </div>

      <div>
        <h1>Login</h1>
      </div>
    </div>
  );
};

export default NavBar;
