import { apiSlice } from "../api/apiSlice";

export const chatApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllChats: builder.query({
      query: () => ({
        url: "/v1/chat",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllChatsQuery } = chatApi;
