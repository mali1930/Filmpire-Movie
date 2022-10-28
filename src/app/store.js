import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./Slices/ThemeSlice";
import  genreOrCategoryReducer  from "./features/currentGenreOrCategory";
import { tmdbApi } from "../Services/TMDB";
export default configureStore({
  reducer: {
    [tmdbApi.reducerPath]: tmdbApi.reducer,
    theme: themeReducer,
    currentGenreOrCategory: genreOrCategoryReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tmdbApi.middleware),
});
