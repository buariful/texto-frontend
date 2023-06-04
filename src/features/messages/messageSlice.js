import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  isLoading: false,
  error: "Please Select a Friend or a Group",
  data: [],
  chatId: null,
};

const messageSlice = createSlice({
  name: "messageSlice",
  initialState,
  reducers: {
    setMsgLoading: (state) => {
      state.isLoading = true;
      // state.error = null;
      state.data = [];
      // state.chatId = null;
    },
    setMsgError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
      state.data = [];
      state.chatId = action.payload.chatId;
    },
    setMsgData: (state, action) => {
      state.isLoading = false;
      // state.error = null;
      state.data = action.payload.data;
      state.chatId = action.payload.chatId;
    },
    addNewMsg: (state, action) => {
      state.data = [...state.data, action.payload];
    },
  },
});

export default messageSlice.reducer;
export const { setMsgLoading, setMsgError, setMsgData, addNewMsg } =
  messageSlice.actions;
