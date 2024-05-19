import { configureStore } from "@reduxjs/toolkit";
import departmentReducer from "./departmentSlice";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    department: departmentReducer,
    user: userReducer,
  },
});
