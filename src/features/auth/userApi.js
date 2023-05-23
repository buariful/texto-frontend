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
    getUsers: builder.mutation({
      query: (search, token) => ({
        url: `/v1/users?search=${search}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
          Authorization: token,
        },
      }),
    }),
    // getUsers: builder.mutation({
    //   query: (search, token) => ({
    //     url: `/v1/users?search=${search}`,
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //       // Authorization: `Bearer ${token}`,
    //       Authorization: token,
    //     },
    //   }),
    // }),
    getUserByToken: builder.mutation({
      query: (token) => ({
        url: `/v1/getuser`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }),
    }),
  }),
});

export const {
  useSignUpMutation,
  useLoginMutation,
  useGetUsersMutation,
  useGetUserByTokenMutation,
} = userApi;
