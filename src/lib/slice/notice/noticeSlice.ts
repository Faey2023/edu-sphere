import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { INotice } from "@/types";

interface NoticeState {
  notices: INotice[];
  loading: boolean;
  error: string | null;
}

const initialState: NoticeState = {
  notices: [],
  loading: false,
  error: null,
};

const noticeSlice = createSlice({
  name: "notices",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setNotices: (state, action: PayloadAction<INotice[]>) => {
      state.notices = action.payload;
    },
    addNotice: (state, action: PayloadAction<INotice>) => {
      state.notices.push(action.payload);
    },
    removeNotice: (state, action: PayloadAction<string>) => {
      state.notices = state.notices.filter((n) => n._id !== action.payload);
    },
    updateNotice: (state, action: PayloadAction<INotice>) => {
      state.notices = state.notices.map((n) =>
        n._id === action.payload._id ? action.payload : n
      );
    },
  },
});

export const {
  setLoading,
  setError,
  setNotices,
  addNotice,
  removeNotice,
  updateNotice,
} = noticeSlice.actions;

export default noticeSlice.reducer;
