import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    formState: {},
    isEditing: false
  },
  reducers: {
    createTask: (state, action) => {
      const { id, title, dateTime, status } = action.payload;
      state.tasks.push({
        id,
        title,
        dateTime,
        status
      });
    },
    deleteTask: (state, action) => {
      const { id } = action.payload;
      state.tasks = state.tasks.filter((task) => task.id !== id);
    },
    updateStatus: (state, action) => {
      const { id, status } = action.payload;
      state.tasks = state.tasks.map((task) =>
        task.id === id ? { ...task, status } : task
      );
    },
    setFormData: (state, action) => {
      state.isEditing = true;
      const { id } = action.payload;
      const task = state.tasks.find((task) => task.id === id);
      state.formState = task;
    },
    updateTask: (state, action) => {
      const { id, title, dateTime, status } = action.payload;
      state.tasks = state.tasks.map((task) =>
        task.id === id ? { ...task, title, dateTime, status } : task
      );
      state.isEditing = false;
    }
  }
});

export const taskReducers = taskSlice.reducer;

export const taskActions = taskSlice.actions;
