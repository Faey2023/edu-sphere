import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/auth/authSlice";
import teacherReducer from "./slice/teacher/teacherSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    teacher: teacherReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
