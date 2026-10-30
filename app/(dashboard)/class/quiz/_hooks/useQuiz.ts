"use client";

import { useState } from "react";

import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { getApiErrorMessage } from "@/lib/api-error";
import {
  useGetQuizQuery,
  useSubmitQuizMutation,
  type QuizQuestion,
  type QuizResult,
} from "@/redux/features/quiz/quizApi";

import { QUIZ_ID } from "../_constants";

const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

export const useQuiz = () => {
  const t = useTranslations("Dashboard.quiz");
  const { data: quiz, isLoading, isError } = useGetQuizQuery(QUIZ_ID);
  const [submitQuiz, { isLoading: isSubmitting }] = useSubmitQuizMutation();

  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [result, setResult] = useState<QuizResult | null>(null);

  const questions = quiz?.questions ?? [];
  const answeredCount = questions.filter((question) => (answers[question.id]?.length ?? 0) > 0).length;
  const progress = questions.length ? Math.round((answeredCount / questions.length) * 100) : 0;
  const canSubmit = questions.length > 0 && answeredCount === questions.length && !isSubmitting && !result;

  const selectOption = (question: QuizQuestion, optionId: string) => {
    if (result) return;

    setAnswers((previous) => {
      const current = previous[question.id] ?? [];
      if (question.type === "single") return { ...previous, [question.id]: [optionId] };

      return {
        ...previous,
        [question.id]: current.includes(optionId) ? current.filter((id) => id !== optionId) : [...current, optionId],
      };
    });
  };

  const submit = async () => {
    if (!canSubmit) return;

    try {
      const response = await submitQuiz({
        quizId: QUIZ_ID,
        answers: questions.map((question) => ({ questionId: question.id, optionIds: answers[question.id] ?? [] })),
      }).unwrap();
      setResult(response);
      scrollToTop();
    } catch (error) {
      toast.error(getApiErrorMessage(error, t("submitError")));
    }
  };

  const retake = () => {
    setAnswers({});
    setResult(null);
    scrollToTop();
  };

  return {
    quiz,
    isLoading,
    isError,
    answers,
    answeredCount,
    progress,
    canSubmit,
    isSubmitting,
    result,
    selectOption,
    submit,
    retake,
  };
};
