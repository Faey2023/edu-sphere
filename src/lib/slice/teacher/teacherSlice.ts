import { ITeacher } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
 

interface TeacherState {
  teachers: ITeacher[];
  loading: boolean;
  error: string | null;
}

const initialState: TeacherState = {
  teachers: [],
  loading: false,
  error: null,
};

const teacherSlice = createSlice({
  name: "teacher",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    addTeacherSuccess: (state, action: PayloadAction<ITeacher>) => {
      state.loading = false;
      state.teachers.push(action.payload);
    },
    setError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { startLoading, addTeacherSuccess, setError } = teacherSlice.actions;
export default teacherSlice.reducer;
