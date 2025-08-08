import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import { startTransition } from "react";

const API_URL = "https://6890fac8944bf437b597f023.mockapi.io/todos";

/* const initialTodos = [
  { id: 1, text: "Görev deneme 1", tamamlandi: true },
  { id: 2, text: "Görev deneme 2", tamamlandi: false },
]; */

const getTodos = createAsyncThunk("todos/getTodos", async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
});

const addTodo = createAsyncThunk("todos/addTodo", async (text) => {
  try {
    const data = { text, tamamlandi: false };
    const response = await axios.post(API_URL, data);
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
});

const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async ({ id, tamamlandi }) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, { tamamlandi });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id) => {
  try {
    const res = await axios.delete(`${API_URL}/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
});

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    data: [],
    error: null,
    status: "bekleniyor",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // getTodos
      .addCase(getTodos.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "okay";
      })
      .addCase(getTodos.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = "hata";
      })
      .addCase(getTodos.pending, (state, action) => {
        state.status = "bekle";
      })
      // addTodo
      .addCase(addTodo.fulfilled, (state, action) => {
        console.log(action);
        state.data.push(action.payload);
        state.status = "okay";
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = "hata";
      })
      .addCase(addTodo.pending, (state, action) => {
        state.status = "bekle";
      })

      // updateTodo
      .addCase(updateTodo.fulfilled, (state, action) => {
        const todoIndex = state.data.findIndex(
          (todo) => todo.id === action.payload.id
        );
        console.log(state.data[todoIndex]);
        state.data[todoIndex].tamamlandi = action.payload.tamamlandi;
        state.status = "okay";
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = "hata";
      })
      .addCase(updateTodo.pending, (state, action) => {
        state.status = "bekle";
      })

      // deleteTodo
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.data = state.data.filter((todo) => {
          return todo.id !== action.payload.id;
        });
        state.status = "okay";
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = "hata";
      })
      .addCase(deleteTodo.pending, (state, action) => {
        state.status = "bekle";
      });
  },
});

const selectTodos = (state) => state.todos.data;
const selectTodosStatus = (state) => state.todos.status;

const selectTodosCount = createSelector([selectTodos], (todos) => {
  let activeCount = 0;
  let completedCount = 0;

  console.log("merhaba");

  todos.forEach((todo) => {
    if (todo.tamamlandi) {
      completedCount++;
    } else {
      activeCount++;
    }
  });

  return {
    activeCount,
    completedCount,
    allCount: todos.length,
  };
});

export {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
  selectTodos,
  selectTodosStatus,
  selectTodosCount,
};
export default todoSlice.reducer;
