// "use client";
import { configureStore } from "@reduxjs/toolkit";
import { PostReducer } from "./PostSlice";

export const reduxStore = configureStore({
  reducer: {
    postsRed: PostReducer,
  },
});
