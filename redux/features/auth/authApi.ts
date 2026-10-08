import { apiSlice } from "../api/apiSlice";

export interface AdminLoginResponse {
  accessToken: string;
  admin: {
    id: string;
    email: string;
  };
}

export interface LoginResponse {
  status: string;
  statusCode: number;
  data: {
    accessToken: string;
    user: {
      id: string;
      name: string;
      email: string;
      profilePicture: string | null;
    };
  };
}

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, { email: string; password: string; rememberMe: boolean }>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    adminLogin: builder.mutation<AdminLoginResponse, { email: string; password: string }>({
      query: (credentials) => ({
        url: "/admin/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation, useAdminLoginMutation } = authApi;
