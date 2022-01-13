import { configureStore } from "@reduxjs/toolkit";
import { taskReducers } from "./taskSlice";

const store = configureStore({
  reducer: {
    tasks: taskReducers
  }
});

export default store;
