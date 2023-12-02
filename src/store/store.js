import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todoSlice";
import userSlice from "./userStore";

const store = configureStore({
  reducer: {
    todo: todoReducer,
    user: userSlice,
  },
});

export default store;
