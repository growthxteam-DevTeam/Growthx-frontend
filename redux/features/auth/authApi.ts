import { apiSlice } from "../api/apiSlice";

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

interface MessageResponse {
  status: string;
  statusCode: number;
  message: string;
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
    forgotPassword: builder.mutation<MessageResponse, { email: string }>({
      query: (body) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body,
      }),
    }),
    resetPassword: builder.mutation<MessageResponse, { token: string; password: string }>({
      query: (body) => ({
        url: "/auth/reset-password",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
