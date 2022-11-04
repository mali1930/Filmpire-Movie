import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Sidebar from "./Components/Sidebar";
import Home from "./Components/Pages/Home/Home";
import ActorDetail from "./Components/Pages/ActorDetail/ActorDetail";
import MovieDetail from "./Components/Pages/MovieDetail/MovieDetail";
import Profile from "./Components/Pages/Profile/Profile";
import { saveStateToStorage } from "./app/features/currentGenreOrCategory";
const App = () => {
  const [toggleSideBar, setToggleSideBar] = useState(false);
  const {
    theme: { theme },
    currentGenreOrCategory,
  } = useSelector((s) => s);

  useEffect(() => {
    saveStateToStorage(currentGenreOrCategory);
  }, [currentGenreOrCategory]);
  return (
    <>
      <div className={"flex relative w-full " + theme}>
        <Sidebar {...{ toggleSideBar, setToggleSideBar }} />
        <div className="flex-1 w-full  dark:text-white dark:bg-zinc-900 ">
          <NavBar {...{ toggleSideBar, setToggleSideBar }} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element=<MovieDetail /> />
            <Route path="/actor/:id" element=<ActorDetail /> />
            <Route path="/profile" element=<Profile /> />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
