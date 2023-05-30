import { apiSlice } from "../api/apiSlice";

export const messageApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllMessages: builder.mutation({
      query: ({ token, chatId }) => ({
        url: `/v1/messages/${chatId}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }),
    }),
    sendMessage: builder.mutation({
      query: ({ token, data }) => ({
        url: "/v1/message",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }),
    }),
  }),
});

export const { useGetAllMessagesMutation, useSendMessageMutation } = messageApi;
