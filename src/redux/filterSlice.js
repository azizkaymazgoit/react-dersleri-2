import { createSlice } from "@reduxjs/toolkit";
import { selectTodos } from "./todoSlice";

const filterSlice = createSlice({
  name: "filter",
  initialState: "all",
  reducers: {
    setFilter: (state, action) => action.payload,
  },
});

const selectFilter = (state) => state.filter;

const selectFilterTodos = (state) => {
  const todos = selectTodos(state);
  const filter = selectFilter(state);
  switch (filter) {
    case "completed":
      return todos.filter((todo) => todo.tamamlandi);
    case "active":
      return todos.filter((todo) => !todo.tamamlandi);
    default:
      return todos;
  }
};

export { selectFilter, selectFilterTodos };
export const { setFilter } = filterSlice.actions;
export default filterSlice.reducer;
