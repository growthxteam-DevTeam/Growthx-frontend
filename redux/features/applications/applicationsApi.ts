import { apiSlice } from "../api/apiSlice";

// Mirrors the backend's grouped ApplicationEntity (see growth-x-be README), not the flat request payload.
export interface ApplicationRecord {
  _id: string;
  applicationPortal: {
    fullName: string;
    email: string;
    program: string;
    cohort?: string;
  };
  personalInfo: {
    title?: string;
    surname: string;
    firstName: string;
    businessName: string;
    dateOfBirth: string;
    gender: string;
  };
  businessBasics: {
    businessDescription: string;
    operatingDuration: string;
    averageRevenue: string;
    fullTimeCommitment: "full-time" | "not-yet";
  };
  whoYouAre: {
    challengeAndSkillGap: string;
    cohortMotivation: string;
  };
  accessibilitySupport: {
    hasAccessibilityNeeds: "yes" | "no";
    accessibilityNeed?: string;
  };
  submit: {
    passportPhotoUrl?: string;
  };
  status: "pending" | "reviewed" | "accepted" | "rejected";
  createdAt: string;
}

interface SubmitApplicationResponse {
  status: string;
  statusCode: number;
  data: ApplicationRecord;
}

interface CreatePasswordRequest {
  gsCode: string;
  password: string;
}

interface CreatePasswordResponse {
  status: string;
  statusCode: number;
  message: string;
}

export const applicationsApi = apiSlice.enhanceEndpoints({ addTagTypes: ["Applications"] }).injectEndpoints({
  endpoints: (builder) => ({
    // Body is FormData, not JSON — the onboarding wizard's final step can
    // attach a passport photo, and the backend (POST /applications) expects
    // multipart/form-data for that reason. fetchBaseQuery leaves FormData
    // bodies untouched (no JSON.stringify, no manual Content-Type), which is
    // what lets the browser set the multipart boundary itself.
    submitApplication: builder.mutation<SubmitApplicationResponse, FormData>({
      query: (formData) => ({
        url: "/applications",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Applications"],
    }),

    createPassword: builder.mutation<CreatePasswordResponse, CreatePasswordRequest>({
      query: (body) => ({
        url: "/applications/create-password",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useSubmitApplicationMutation, useCreatePasswordMutation } = applicationsApi;
