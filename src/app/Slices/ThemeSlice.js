import { createSlice } from "@reduxjs/toolkit";

export const ThemeSlice = createSlice({
  name: "theme",
  initialState: {
    theme: localStorage?.getItem("theme") || "light",
  },
  reducers: {
    switchTheme: (state) => {
      if (state.theme === "light") {
        state.theme = "dark";
      } else {
        state.theme = "light";
      }
      localStorage.setItem("theme", state.theme);
    },
  },
});

// Action creators are generated for each case reducer function
export const { switchTheme } = ThemeSlice.actions;

export default ThemeSlice.reducer;
