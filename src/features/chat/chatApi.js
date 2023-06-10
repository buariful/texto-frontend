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
    createGroup: builder.mutation({
      query: ({ token, data }) => ({
        url: "/v1/group",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }),
    }),
    deleteGroup: builder.mutation({
      query: ({ token, chatId }) => ({
        url: "/v1/delete-group",
        method: "DELETE",
        body: { chatId: chatId },
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }),
    }),
    addToGroup: builder.mutation({
      query: ({ token, data }) => ({
        url: "/v1/addTo-group",
        method: "PUT",
        body: data,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }),
    }),

    removeFromGroup: builder.mutation({
      query: ({ token, data }) => ({
        url: "/v1/removefrom-group",
        method: "PUT",
        body: data,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }),
    }),
  }),
});

export const {
  useGetAllChatsMutation,
  useAccesOneChatMutation,
  useCreateGroupMutation,
  useDeleteGroupMutation,
  useAddToGroupMutation,
  useRemoveFromGroupMutation,
} = chatApi;
