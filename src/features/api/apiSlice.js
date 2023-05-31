import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    // baseUrl: "https://texto-backend.onrender.com/api",
    baseUrl: process.env.REACT_APP_API_URL,

    prepareHeaders: (headers, { getState }) => {
      headers.set("Accept", "application/json");
      return headers;
    },
  }),

  endpoints: (builder) => ({}),
});
