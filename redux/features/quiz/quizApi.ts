import { apiSlice } from "../api/apiSlice";

export interface QuizOption {
  id: string;
  text: string;
}

export interface QuizQuestion {
  id: string;
  text: string;
  type: "single" | "multiple";
  points: number;
  options: QuizOption[];
}

export interface QuizAttemptSummary {
  score: number;
  totalPoints: number;
  passed: boolean;
  submittedAt: string;
}

export interface Quiz {
  id: string;
  title: string;
  subtitle: string;
  passingScore: number;
  totalPoints: number;
  questions: QuizQuestion[];
  /** The learner's most recent attempt, or null if they haven't taken it. */
  lastAttempt: QuizAttemptSummary | null;
}

export interface QuizResult {
  score: number;
  totalPoints: number;
  passingScore: number;
  passed: boolean;
  results: { questionId: string; correct: boolean; explanation: string }[];
}

export interface QuizAnswer {
  questionId: string;
  optionIds: string[];
}

export const quizApi = apiSlice.enhanceEndpoints({ addTagTypes: ["Quiz"] }).injectEndpoints({
  endpoints: (builder) => ({
    getQuiz: builder.query<Quiz, string>({
      query: (quizId) => `/quizzes/${quizId}`,
      transformResponse: (response: { data: Quiz }) => response.data,
      providesTags: (_result, _error, quizId) => [{ type: "Quiz", id: quizId }],
    }),

    submitQuiz: builder.mutation<QuizResult, { quizId: string; answers: QuizAnswer[] }>({
      query: ({ quizId, answers }) => ({
        url: `/quizzes/${quizId}/submissions`,
        method: "POST",
        body: { answers },
      }),
      transformResponse: (response: { data: QuizResult }) => response.data,
      invalidatesTags: (_result, _error, { quizId }) => [{ type: "Quiz", id: quizId }],
    }),
  }),
});

export const { useGetQuizQuery, useSubmitQuizMutation } = quizApi;
