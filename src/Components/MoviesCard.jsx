import React from "react";
import ReactStars from "react-rating-stars-component";

import { useNavigate } from "react-router-dom";
const MoviesCard = ({ movie }) => {
  const nav = useNavigate();
  const handleNav = () => {
    nav(`/movie/${movie?.id}`);
  };

  return (
    <div className="rounded-lg w-[200px]  animate-fade" onClick={handleNav}>
      <div className=" hover:-translate-y-3 transition-all  ">
        {movie.poster_path ? (
          <img
            alt={movie.title}
            className="rounded-lg cursor-pointer"
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          />
        ) : (
          <img
            alt={movie.title}
            className="rounded-lg cursor-pointer"
            src={"https://www.fillmurrary.com/200/300"}
          />
        )}
      </div>
      <div>
        <p className="font-bold mt-2 truncate">{movie.title}</p>

        <ReactStars
          edit={false}
          count={5}
          size={20}
          value={movie.vote_average / 2}
        />
      </div>
    </div>
  );
};

export default MoviesCard;
