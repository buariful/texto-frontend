import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  isLoading: false,
  error: null,
  data: null,
};

const searchUserSlice = createSlice({
  name: "serachUserSlice",
  initialState,
  reducers: {
    getUserBySearch: (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    searchUserLoading: (state) => {
      state.isLoading = true;
      state.error = null;
      state.data = null;
    },
    searchUserError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      state.data = null;
    },
  },
});

export default searchUserSlice.reducer;
export const { getUserBySearch, searchUserLoading, searchUserError } =
  searchUserSlice.actions;
