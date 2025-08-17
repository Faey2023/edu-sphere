import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, IUser } from "@/types";

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<IUser>) => {
      state.loading = false;
      state.user = action.payload;
    },
    registerSuccess: (state, action: PayloadAction<IUser>) => {
      state.loading = false;
      state.user = action.payload;
    },
    authFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    resetError: (state) => {
      state.error = null;
    },
  },
});

export const { startLoading, loginSuccess, registerSuccess, authFailure, logout, resetError } = authSlice.actions;
export default authSlice.reducer;
