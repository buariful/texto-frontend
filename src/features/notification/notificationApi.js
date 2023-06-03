import { apiSlice } from "../api/apiSlice";

const notficationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllNotification: builder.mutation({
      query: (token) => ({
        url: "/v1/notification",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }),
    }),
    deleteNotification: builder.mutation({
      query: ({ token, chatId }) => ({
        url: "/v1/notification",
        method: "DELETE",
        body: { chatId: chatId },
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }),
    }),
  }),
});

export default notficationApi;
export const { useGetAllNotificationMutation, useDeleteNotificationMutation } =
  notficationApi;
