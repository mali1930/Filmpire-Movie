import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  genreOrCategoryName: "",
  page: 1,
  searchQuery: "",
};

if (typeof window !== "undefined") {
  const state = localStorage.getItem("genreOrCategory");
  if (state) {
    try {
      initialState = JSON.parse(state);
    } catch (error) {}
  }
}

export const saveStateToStorage = (state) => {
  localStorage.setItem("genreOrCategory", JSON.stringify(state));
};

export const genreOrCategory = createSlice({
  name: "genreOrCategory",
  initialState,
  reducers: {
    selectGenreOrCategory: (state, action) => {
      state.genreOrCategoryName = action.payload;
      state.searchQuery = "";
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    searchMovie: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { selectGenreOrCategory, setPage, searchMovie } =
  genreOrCategory.actions;

export default genreOrCategory.reducer;
