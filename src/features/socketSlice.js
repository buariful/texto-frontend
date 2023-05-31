import { createSlice } from "@reduxjs/toolkit";

const socketSlice = createSlice({
  name: "socketSlice",
  initialState: { socket: null },
  reducers: {
    addSocket: (state, action) => {
      state.socket = action.payload;
    },
  },
});

export default socketSlice.reducer;
export const { addSocket } = socketSlice.actions;
