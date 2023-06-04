import { createSlice } from "@reduxjs/toolkit";

let initialState = { notification: [], data: [] };
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
    setNotification: (state, action) => {
      state.notification = [...action.payload];
    },
    addSingleNotification: (state, action) => {
      state.notification = [...state.notification, ...action.payload];
    },
    updateNotifications: (state, action) => {
      const { chatId, userId } = action.payload;
      const filteredNotifications = state.notification.filter(
        (obj) => obj.userId !== userId || obj.chatId !== chatId
      );
      state.notification = filteredNotifications;
    },
  },
});

export default chatSlice.reducer;
export const {
  setChats,
  addSingleChat,
  setNotification,
  addSingleNotification,
  updateNotifications,
} = chatSlice.actions;
