import { apiSlice } from "../api/apiSlice";

export interface ApplicationRecord {
  _id: string;
  fullName: string;
  email: string;
  program: string;
  cohort?: string;
  title?: string;
  surname: string;
  firstName: string;
  businessName: string;
  dateOfBirth: string;
  gender: string;
  businessDescription: string;
  challengeAndSkillGap: string;
  hasAccessibilityNeeds: "yes" | "no";
  passportPhotoUrl?: string;
  status: "pending" | "reviewed" | "accepted" | "rejected";
  createdAt: string;
}

interface SubmitApplicationResponse {
  status: string;
  statusCode: number;
  data: ApplicationRecord;
}

export const applicationsApi = apiSlice
  .enhanceEndpoints({ addTagTypes: ["Applications"] })
  .injectEndpoints({
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
    }),
  });

export const { useSubmitApplicationMutation } = applicationsApi;
