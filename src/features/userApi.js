import { apiSlice } from "./api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (userData) => ({
        url: "/v1/register",
        method: "POST",
        body: userData,
      }),
    }),
  }),
});

export const { useSignUpMutation } = userApi;
