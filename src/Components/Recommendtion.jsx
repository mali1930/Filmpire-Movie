import React from "react";
import { useParams } from "react-router-dom";
import MoviesCard from "../Components/MoviesCard";
import { useGetRecommendationsQuery } from "../Services/TMDB";

const Recommendtion = () => {
  const { id } = useParams();
  const { data: recommendations, isFetching: isRecommendationsFetching } =
    useGetRecommendationsQuery({ list: "/recommendations", movie_id: id });

  return (
    <>
      <div className="mb-10 mt-10">
        <h1 className="font-bold text-2xl text-center">You Might Also Like</h1>
        <div className="flex items-center mb-10 mt-10 flex-wrap gap-2 justify-around">
          {/* loop through recommend movies */}
          {recommendations ? (
            recommendations.results
              .slice(0, 10)
              .map((recommendation) => (
                <MoviesCard key={recommendation.id} movie={recommendation} />
              ))
          ) : (
            <h1>Sorry,nothing was found!</h1>
          )}
        </div>
      </div>
    </>
  );
};

export default Recommendtion;
