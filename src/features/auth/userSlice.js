import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  user: null,
  isAuthLoading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      localStorage.removeItem("auth");
    },
    setAuthLoading: (state, action) => {
      state.isAuthLoading = action.payload;
    },
  },
});

export const { setUser, clearUser, setAuthLoading } = userSlice.actions;

export default userSlice.reducer;
