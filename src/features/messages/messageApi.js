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
  }),
});

export const { useGetAllMessagesMutation } = messageApi;
