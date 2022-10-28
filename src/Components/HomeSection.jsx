import React from "react";

const HomeSection = ({ movie }) => {
  return (
    <div className="w-full mb-4 rounded-md relative overflow-hidden">
      <img
        src={`https://image.tmdb.org/t/p/w500/${movie?.backdrop_path}`}
        className="object-cover w-full h-[30rem]"
        alt="movie cover"
      />
      <div className="absolute p-5 text-white inset-0 gap-2 bg-black/50 flex flex-col justify-end">
        {/* <h1>{movie.overview}</h1> */}
      </div>
    </div>
  );
};

export default HomeSection;
