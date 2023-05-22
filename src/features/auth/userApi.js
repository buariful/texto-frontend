import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (userData) => ({
        url: "/v1/register",
        method: "POST",
        body: userData,
        headers: {
          "Content-Type": "application/json",
          // Authorization: "Bearer <your_token>",
        },
      }),
    }),
    login: builder.mutation({
      query: (userData) => ({
        url: "/v1/login",
        method: "POST",
        body: userData,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const { useSignUpMutation, useLoginMutation } = userApi;
