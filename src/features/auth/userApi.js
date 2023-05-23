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
    getUserByToken: builder.mutation({
      query: (token) => ({
        url: "/v1/getuser",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NmMzMjNhOWZiYmJiMTBlNzliODkwYyIsImlhdCI6MTY4NDgxOTk3NCwiZXhwIjoxNjg2MTE1OTc0fQ.4vpq2XSZU5Ycr7ewn54pLFO3z1NlSYn0xDeQpSLSgI0",
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
