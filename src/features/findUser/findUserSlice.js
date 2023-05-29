import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  data: null,
  error: null,
  isLoading: false,
};

const findUserSlice = createSlice({
  name: "searchUser",
  initialState,
  reducers: {
    findUser: (state, action) => {
      state.data = action.payload;
      state.error = null;
      state.isLoading = false;
    },
    findUserLoading: (state, action) => {
      state.isLoading = action.payload;
      state.data = null;
      state.error = null;
    },
    findUserError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      state.data = null;
    },
  },
});

export const { findUser, findUserLoading, findUserError } =
  findUserSlice.actions;

export default findUserSlice.reducer;
