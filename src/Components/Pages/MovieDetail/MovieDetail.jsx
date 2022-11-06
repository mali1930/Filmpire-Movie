import React, { useState, useEffect } from "react";
import axios from "axios";
import { userSelector } from "../../../app/features/auth";
import ReactStars from "react-rating-stars-component";
import { GrLanguage } from "react-icons/gr";
import { BiMovie } from "react-icons/bi";
import { BsFillSuitHeartFill } from "react-icons/bs";
import { FaTheaterMasks } from "react-icons/fa";
import { MdFavoriteBorder } from "react-icons/md";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useGetMovieQuery, useGetListQuery } from "../../../Services/TMDB";
import { Link, useParams } from "react-router-dom";
import { selectGenreOrCategory } from "../../../app/features/currentGenreOrCategory";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import genreIcons from "../../assets/genres";
import Loader from "../../Loader";

import Recommendtion from "../../Recommendtion";
import Modal from "../../Modal";

const MovieDetail = () => {
  const home = useNavigate();
  const navigate = useNavigate();
  const { id } = useParams();
  const [modal, toggleModal] = useState(false);
  const [isMovieFavorited, setIsMovieFavorited] = useState(false);

  const { user } = useSelector(userSelector);

  const dispatch = useDispatch();
  const { data: movie, isFetching, isError } = useGetMovieQuery(id);

  const { data: favoriteMovies } = useGetListQuery({
    listName: "favorite/movies",
    accountId: user.id,
    sessionId: localStorage.getItem("session_id"),
    page: 1,
  });

  useEffect(() => {
    setIsMovieFavorited(
      !!favoriteMovies?.results?.find((movie_) => movie_?.id === movie?.id)
    );
  }, [favoriteMovies]);

  if (isFetching) {
    return <Loader />;
  }
  if (isError) return <h1>404 Not Found</h1>;

  const addToFavorite = async () => {
    await axios.post(
      `https://api.themoviedb.org/3/account/${user.id}/favorite?api_key=${
        process.env.REACT_APP_TMDB_KEY
      }&session_id=${localStorage.getItem("session_id")}`,
      {
        media_type: "movie",
        media_id: id,
        favorite: !isMovieFavorited,
      }
    );
    setIsMovieFavorited((prev) => !prev);
  };

  return (
    <>
      <div className="mt-10 mb-10 px-10">
        <button onClick={() => home("/")}>
          <AiOutlineArrowLeft size={30} />
        </button>
      </div>
      <div className="px-3 gap-5 flex flex-wrap mb-10  justify-center">
        <div>
          {movie.poster_path ? (
            <img
              className="shadow-2xl w-[350px]   rounded-xl "
              alt={movie.title}
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            />
          ) : (
            <img
              alt={movie.title}
              src={"https://www.fillmurrary.com/200/300"}
            />
          )}
        </div>
        <div className=" mt-2 text-start px-3 leading-8  ">
          <p className="text-3xl mb-2">{movie.title}</p>
          <div className="flex gap-3 items-center ">
            <div className="flex gap-3 ">
              <ReactStars
                edit={false}
                count={5}
                size={20}
                value={movie.vote_average / 2}
              />
              <p className="font-bold text-md mb-2">
                {movie?.vote_average.toFixed(1)}
              </p>
            </div>
            <p className="font-bold text-lg mb-2"> {movie.release_date}</p>
          </div>

          <h6>
            {movie?.runtime} min
            {movie?.spoken_languages.length > 0
              ? `/${movie?.spoken_languages[0].name}`
              : ""}
          </h6>
          <div className="flex gap-3 flex-wrap md:justify-start justify-center items-center">
            {movie?.genres?.map((genre, i) => (
              <Link
                onClick={() => dispatch(selectGenreOrCategory(genre.id))}
                key={genre.name}
                to="/"
                className="flex flex-col items-center mt-3"
              >
                <img
                  alt="category icon"
                  src={genreIcons[genre.name.toLowerCase()]}
                  className="w-7 h-7 dark:invert"
                />
                {genre.name}
              </Link>
            ))}
          </div>
          {/* summary top cast */}
          <div>
            <h1 className="font-bold text-lg">Overview</h1>
            <p className="md:w-[520px] text-sm ">{movie.overview}</p>
          </div>
          <div>
            <h1 className="font-bold text-lg mb-2">Top Cast</h1>
            <div className="flex cursor-pointer flex-wrap gap-2 md:justify-start justify-center items-center  ">
              {movie &&
                movie.credits?.cast?.slice(0, 6).map((character, i) => (
                  <div
                    onClick={() => navigate(`/actor/${character.id}`)}
                    key={i}
                  >
                    {character.profile_path && (
                      <img
                        className=" w-[80px] rounded-lg "
                        src={`https://image.tmdb.org/t/p/w500/${character.profile_path}`}
                        alt="character.name"
                      />
                    )}
                    <p className="text-sm w-[71px] truncate">
                      {character?.name}
                    </p>
                    <p className="text-sm w-[70px] truncate ">
                      {character.character.split("/")[0]}
                    </p>
                  </div>
                ))}
            </div>
            {/* //Buttons trailer,watchList */}
            <div className="mt-5 mb-5 flex flex-wrap items-center justify-start gap-1  ">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={movie?.homepage}
                className="flex items-center gap-2 border-2   px-2 mb-3 "
              >
                <span>
                  <GrLanguage className="dark:invert " />
                </span>
                Website
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`https://www.imdb.com/title/${movie?.imdb_id}`}
                className="flex items-center gap-2 border-2  px-2 mb-3 "
              >
                <span>
                  <BiMovie />
                </span>
                IMDB
              </a>
              <button
                onClick={() => toggleModal(true)}
                className="flex items-center gap-2 border-2  px-2 mb-3 "
              >
                <span>
                  <FaTheaterMasks />
                </span>
                Trailer
              </button>
              {/* 2 */}
              <button
                onClick={addToFavorite}
                className="flex items-center gap-2 border-2  px-2 mb-3 "
              >
                {isMovieFavorited ? (
                  <h1 className="flex items-center gap-1">
                    <BsFillSuitHeartFill />
                    UnFavorite
                  </h1>
                ) : (
                  <h1 className="flex items-center gap-1">
                    <MdFavoriteBorder />
                    Favorite
                  </h1>
                )}
              </button>
            </div>
          </div>
          <Modal
            toggle={toggleModal}
            videoKey={movie.videos.results?.[0]?.key}
            isOpen={modal && movie.videos.results?.[0]?.key}
          />
        </div>
      </div>
      <Recommendtion />
    </>
  );
};
export default MovieDetail;
