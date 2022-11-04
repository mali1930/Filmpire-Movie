import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./Slices/ThemeSlice";
import genreOrCategoryReducer from "./features/currentGenreOrCategory";
import { tmdbApi } from "../Services/TMDB";
import userReducer from "./features/auth";
export default configureStore({
  reducer: {
    [tmdbApi.reducerPath]: tmdbApi.reducer,
    theme: themeReducer,
    currentGenreOrCategory: genreOrCategoryReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tmdbApi.middleware),
});
