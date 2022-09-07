import { configureStore } from "@reduxjs/toolkit";
import colorModeSlice from "./colormode.slice";

export const store = configureStore({
  reducer: {
    colorModeSlice:colorModeSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;