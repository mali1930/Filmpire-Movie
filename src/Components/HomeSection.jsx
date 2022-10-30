import React from "react";

const HomeSection = ({ movie }) => {
  return (
    <div className="w-full mb-4 rounded-md relative overflow-hidden">
      <img
        src={`https://image.tmdb.org/t/p/w500/${movie?.backdrop_path}`}
        className="object-cover w-full h-auto "
        alt="movie cover"
      />

      <div className="relative  top-0 right-0  text-white inset-0  bg-black/50 flex flex-col justify-end">
        <div className="flex gap-2 p-4 absolute  flex-col max-w-2xl">
          <h1 className="md:text-3xl text-xl font-bold">{movie.title}</h1>
          <h1 className="text-sm md:text-md">{movie.overview}</h1>
        </div>
      </div>
    </div>
  );
};

export default HomeSection;
