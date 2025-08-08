import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./todoSlice";
import filterSlice from "./filterSlice";

export const store = configureStore({
  reducer: {
    todos: todoSlice,
    filter: filterSlice,
  },
});
