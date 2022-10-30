import React from "react";

import Loader from "../../Loader";
import { useGetMoviesByActorIdQuery } from "../../../Services/TMDB";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { useGetActorsDetailsQuery } from "../../../Services/TMDB";
import MoviesCard from "../../MoviesCard";
const ActorDetail = () => {
  const handleBack = useNavigate();
  const page = 1;
  const { id } = useParams();
  const { data, isFetching, isError } = useGetActorsDetailsQuery(id);
  const { data: movies } = useGetMoviesByActorIdQuery({ id, page });

  if (isFetching) {
    return <Loader />;
  }
  if (isError) {
    return "Nothing Is Found, please try again later!";
  }
  return (
    <>
      <div className="w-full mt-10 items-center justify-center mb-10 px-2 gap-10 flex  flex-wrap ">
        <div>
          <img
            src={`https://image.tmdb.org/t/p/w780/${data?.profile_path}`}
            alt={data?.title}
            className="w-[320px] mb-4  rounded-lg shadow-xl "
          />
        </div>

        <div className="max-w-xl px-2 flex flex-col ">
          <p className="md:text-4xl text-2xl mb-3 ">{data?.name}</p>
          <p className=" text-lg">
            Born: {new Date(data?.birthday).toDateString()}
          </p>
          <p className="text-sm leading-6 text-gray-500 dark:text-gray-100">
            {data?.biography || "sorry, no biography yet..."}
          </p>
          <div className="mt-3">
            <a
              target="_blank"
              className="bg-blue-600 text-white dark:bg-red-600 py-1 px-4 rounded-md"
              href={`https://www.imdb.com/name/${data?.imdb_id}`}
              rel="noreferrer"
            >
              IMDB
            </a>
            <button onClick={() => handleBack(`/Movie/${id}`)}>
              <AiOutlineArrowLeft />
            </button>
          </div>
        </div>
      </div>
      <div className="m-[2rem]">
        <div className="text-center text-2xl mb-10 ">Movies</div>
        <div className="flex flex-wrap px-3 gap-5 justify-center items-center">
          {movies ? (
            movies.results
              .slice(0, 10)
              .map((movie) => <MoviesCard key={movie.id} movie={movie} />)
          ) : (
            <h1>Sorry,nothing was found!</h1>
          )}
        </div>
      </div>
    </>
  );
};

export default ActorDetail;
