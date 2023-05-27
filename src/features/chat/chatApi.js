import { apiSlice } from "../api/apiSlice";

export const chatApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllChats: builder.mutation({
      query: (token) => ({
        url: "/v1/chats",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }),
    }),
    accesOneChat: builder.mutation({
      query: ({ token, id }) => ({
        url: "/v1/access-one-chat",
        method: "POST",
        body: id,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }),
    }),
  }),
});

export const { useGetAllChatsMutation, useAccesOneChatMutation } = chatApi;
