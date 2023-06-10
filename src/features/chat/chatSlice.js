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
    updateLatestMsg: (state, action) => {
      let chatId = action.payload.chat._id;
      const chatIndex = state.data.findIndex((d) => d._id === chatId);
      state.data[chatIndex].latestMessage = action.payload;
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
    updateChats: (state, action) => {
      const newChats = state.data.filter((d) => d._id !== action.payload);
      state.data = newChats;
    },
    removeUser: (state, action) => {
      const { userId, chatId } = action.payload;

      const chat = state.data.find((item) => item._id === chatId);
      const otherChats = state.data.filter((item) => item._id !== chatId);
      if (chat) {
        const userIndex = chat.users.findIndex((user) => user._id === userId);
        if (userIndex !== -1) {
          chat.users.splice(userIndex, 1);
        }
      }
      state.data = [...otherChats, chat];
    },
  },
});

export default chatSlice.reducer;
export const {
  setChats,
  addSingleChat,
  setNotification,
  updateLatestMsg,
  addSingleNotification,
  updateNotifications,
  updateChats,
  removeUser,
} = chatSlice.actions;
