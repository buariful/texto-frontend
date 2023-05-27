import { createSlice } from "@reduxjs/toolkit";

let initialState = { data: null };
const chatSlice = createSlice({
  name: "userChats",
  initialState,
  reducers: {
    setChats: (state, action) => {
      state.data = action.payload;
    },
    addSingleChat: (state, action) => {
      state.data = [...state.data, action.payload];
    },
  },
});

export default chatSlice.reducer;
export const { setChats, addSingleChat } = chatSlice.actions;
