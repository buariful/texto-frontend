import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  isLoading: false,
  error: "Please Select a Friend or Group",
  data: null,
};

const messageSlice = createSlice({
  name: "messageSlice",
  initialState,
  reducers: {
    setMsgLoading: (state, action) => {
      state.isLoading = action.payload;
      state.error = null;
      state.data = null;
    },
    setMsgError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.data = null;
    },
    setMsgData: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.data = action.payload;
    },
  },
});

export default messageSlice.reducer;
export const { setMsgLoading, setMsgError, setMsgData } = messageSlice.actions;
