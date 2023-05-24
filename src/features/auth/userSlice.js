import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  user: null,
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
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
