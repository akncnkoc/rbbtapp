import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  colorMode: "dark" | "light";
} = {
  colorMode: "light",
};

export const colorModeSlice = createSlice({
  name: "colorMode",
  initialState,
  reducers: {
    toggleColorMode(state) {
      state.colorMode = state.colorMode === "dark" ? "light" : "dark";
    },
  },
});

export const { toggleColorMode } = colorModeSlice.actions;

export default colorModeSlice.reducer;
