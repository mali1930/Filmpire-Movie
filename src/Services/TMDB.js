import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;

// movie/popular?api_key=<<api_key>>&language=en-US&page=1
export const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.themoviedb.org/3" }),
  endpoints: (builder) => ({
    //Get Movies by [type]
    getMovies: builder.query({
      //Get movie by search

      query: ({ genreOrCategoryName, page, searchQuery }) => {
        //search
        if (searchQuery) {
          return `/search/movie?query=${searchQuery}&page=${page}&api_key=${tmdbApiKey}`;
        }

        if (typeof genreOrCategoryName === "number") {
          return `discover/movie?page=${page}&with_genres=${genreOrCategoryName}&api_key=${tmdbApiKey}`;
        }
        return `movie/${
          genreOrCategoryName || "popular"
        }?page=${page}&api_key=${tmdbApiKey}`;
      },
    }),
    //Get Movie by id
    getMovie: builder.query({
      query: (id) => {
        return `movie/${id}?append_to_response=videos,credits&api_key=${tmdbApiKey}`;
      },
    }),

    //get Genres
    getGenres: builder.query({
      query: () => `genre/movie/list?api_key=${tmdbApiKey}`,
    }),
    //get user specific Lists
    getRecommendations: builder.query({
      query: ({ movie_id, list }) =>
        `/movie/${movie_id}/${list}?api_key=${tmdbApiKey}`,
    }),
    //getActors Id
    getActorsDetails: builder.query({
      query: (id) => {
        return `person/${id}?api_key=${tmdbApiKey}`;
      },
    }),
    getMoviesByActorId: builder.query({
      query: ({ id, page }) =>
        `/discover/movie?with_cast=${id}&page=${page}&api_key=${tmdbApiKey}`,
    }),

    // Get List favorite
    getList: builder.query({
      query: ({ listName, accountId, sessionId, page }) =>
        `/account/${accountId}/${listName}?api_key=${tmdbApiKey}&session_id=${sessionId}&page=${page}`,
    }),
  }),
});
export const {
  useGetMoviesQuery,
  useGetMovieQuery,
  useGetGenresQuery,
  useGetRecommendationsQuery,
  useGetActorsDetailsQuery,
  useGetMoviesByActorIdQuery,
  useGetListQuery,
} = tmdbApi;
