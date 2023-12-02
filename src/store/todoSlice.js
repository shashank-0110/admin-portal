import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todo",
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload);
    },
    toggleComplete: (state, action) => {
      const todo = state.find((item) => item.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
    updateTodo: (state, action) => {
      const { id, text } = action.payload;
      const todo = state.find((item) => item.id === id);
      if (todo) {
        todo.text = text;
      }
    },
  },
});

export const { addTodo, toggleComplete, deleteTodo, updateTodo } =
  todoSlice.actions;
export default todoSlice.reducer;
