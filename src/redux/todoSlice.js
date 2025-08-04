import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://6890fac8944bf437b597f023.mockapi.io/todos";

/* const initialTodos = [
  { id: 1, text: "Görev deneme 1", tamamlandi: true },
  { id: 2, text: "Görev deneme 2", tamamlandi: false },
]; */

const getTodos = createAsyncThunk("todos/getTodos", async () => {
  try {
    const response = await axios.get(API_URL);
    return response;
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

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    data: [],
    error: null,
    status: "bekleniyor",
  },
  reducers: {
    updateTodo: (state, action) => {
      console.log("Update Edildi");
    },
    deleteTodo: (state, action) => {
      console.log("Silindi");
    },
  },
  extraReducers: (builder) => {
    builder
      // getTodos
      .addCase(getTodos.fulfilled, (state, action) => {
        console.log("getTodo", action);
        state.data = action.payload.data;
      })
      .addCase(getTodos.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(getTodos.pending, (state, action) => {
        state.status = "Yükleniyor...";
      })
      // addTodo
      .addCase(addTodo.fulfilled, (state, action) => {
        console.log(action);
        state.data.push(action.payload);
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(addTodo.pending, (state, action) => {
        state.status = "Yükleniyor...";
      });
  },
});

export const { updateTodo, deleteTodo } = todoSlice.actions;
export { getTodos, addTodo };
export default todoSlice.reducer;
