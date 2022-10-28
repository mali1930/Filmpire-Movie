import React from "react";
import { useNavigate } from "react-router-dom";

import Loader from "./Loader";
import { Categories } from "../Constants";
import { useGetGenresQuery } from "../Services/TMDB";
import { useSelector, useDispatch } from "react-redux";
import { selectGenreOrCategory } from "../app/features/currentGenreOrCategory";
import genreIcons from "./assets/genres";

const Sidebar = ({ toggleSideBar, setToggleSideBar }) => {
  const { data, isFetching } = useGetGenresQuery();
  const dispatch = useDispatch();

  const { theme } = useSelector((s) => s.theme);
  const nav = useNavigate();
  const redLogo =
    "https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png";

  const blueLogo =
    "https://fontmeme.com/permalink/210930/6854ae5c7f76597cf8680e48a2c8a50a.png";

  //getting genre on movieDetail page
  const changeGenreOrCategory = (genreOrCategory) => {
    dispatch(selectGenreOrCategory(genreOrCategory));
    nav("/");
  };
  return (
    <>
      <div
        className={
          "fixed h-screen overflow-y-scroll overflow-hidden z-50 top-0 left-0 shadow-lg  dark:text-white bg-gray-50 dark:bg-zinc-800 md:sticky " +
          (toggleSideBar ? "w-60" : "w-0 md:w-60")
        }
      >
        <div className="w-full h-24 pt-3 flex items-center justify-center">
          <img
            src={theme === "dark" ? blueLogo : redLogo}
            alt="logo"
            onClick={() => nav("/")}
            className="cursor-pointer"
          />
        </div>
        <div className="mt-3">
          <hr className="w-[90%] ml-2 text-black mb-2 " />
        </div>
        <h1 className="w-full font-bold text-md text-gray-400   text-left py-2 px-3">
          Categories
        </h1>
        {Categories.map((category) => (
          <button
            onClick={() => changeGenreOrCategory(category.href)}
            className=" dark:text-white  flex items-center gap-3 text-left py-2 px-3 w-full hover:bg-gray-300 dark:hover:bg-gray-600"
            key={category.id}
          >
            
            {category.title}
          </button>
        ))}
        <div className="mt-3">
          <hr className="w-[90%] ml-2 text-black mb-2 " />
        </div>
        <h1 className="w-full font-bold text-md  text-gray-400   text-left py-2 px-3">
          Genres
        </h1>
        {isFetching ? (
          <Loader />
        ) : (
          data.genres.map((genre) => (
            <button
              className="w-full flex items-center gap-3 text-left px-3 py-2  hover:bg-gray-300 dark:hover:bg-gray-600 "
              onClick={() => changeGenreOrCategory(genre.id)}
              key={genre.id}
            >
              <img
                alt="category icon"
                src={genreIcons[genre.name.toLowerCase()]}
                className="w-7 h-7 dark:invert"
              />
              {genre.name}
            </button>
          ))
        )}
      </div>
      <div
        onClick={() => setToggleSideBar(false)}
        className={
          "fixed transition-all md:hidden inset-0 bg-black/30 z-10" +
          (toggleSideBar ? " block" : " hidden")
        }
      />
    </>
  );
};

export default Sidebar;
