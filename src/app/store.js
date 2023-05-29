import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";
import userReducer from "../features/auth/userSlice";
import chatReducer from "../features/chat/chatSlice";
import findUserReducer from "../features/findUser/findUserSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    user: userReducer,
    chat: chatReducer,
    findUser: findUserReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
