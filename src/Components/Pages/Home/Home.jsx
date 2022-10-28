import React from "react";
import Loader from "../../Loader";
import { useDispatch, useSelector } from "react-redux";
import { useGetMoviesQuery } from "../../../Services/TMDB";
import MoviesCard from "../../MoviesCard";
import HomeSection from "../../HomeSection";
import Pagination from "../../Pagination";
import { setPage } from "../../../app/features/currentGenreOrCategory";
const Home = ({ movie }) => {
  const { page, genreOrCategoryName, searchQuery } = useSelector(
    (s) => s.currentGenreOrCategory
  );
  const dispatch = useDispatch();
  const { data, isFetching } = useGetMoviesQuery({
    genreOrCategoryName,
    page,
    searchQuery,
  });
  console.log(data);
  const changePage = (page) => {
    dispatch(setPage(page));
  };

  if (isFetching) return <Loader title={"Loading Movies...."} />;

  return (
    <>
      <div className="flex mt-10 md:flex-row   items-center flex-wrap justify-center gap-10">
        <HomeSection movie={movie} />
        {data?.results?.map((movie) => (
          <div key={movie.id}>
            <MoviesCard movie={movie} />
          </div>
        ))}
        {data?.results?.length === 0 && (
          <h1>There is no movies matching your search keyword.</h1>
        )}
      </div>
      <Pagination
        currentPage={page}
        setPage={changePage}
        totalPages={data.total_pages}
      />
    </>
  );
};

export default Home;
