"use client";

import { Award, Check, ClipboardList, X } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

import { Button, buttonVariants } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

import { useQuiz } from "../_hooks/useQuiz";
import QuizQuestionCard from "./QuizQuestionCard";

const QuizView = () => {
  const t = useTranslations("Dashboard.quiz");
  const {
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
  } = useQuiz();

  if (isLoading) return <p className="text-sm text-muted-foreground">{t("loading")}</p>;
  if (isError || !quiz) return <p className="text-sm text-destructive">{t("loadError")}</p>;

  const outcomeByQuestion = new Map(result?.results.map((item) => [item.questionId, item]));

  return (
    <div className="mx-auto w-full max-w-6xl rounded-xl border border-border bg-card p-6 shadow-sm">
      <header className="flex items-start justify-between gap-4 border-b border-border pb-4">
        <div className="flex items-start gap-3">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
            <ClipboardList className="size-4" />
          </span>
          <div>
            <h1 className="text-base font-bold text-primary">{quiz.title}</h1>
            <p className="text-[11px] text-muted-foreground">
              {quiz.subtitle} · {t("questionCount", { count: quiz.questions.length })}
            </p>
          </div>
        </div>

        <p className="flex shrink-0 items-center gap-1.5 text-[11px] text-muted-foreground">
          <Award className="size-3.5" />
          {t("passingScore", { passing: quiz.passingScore, total: quiz.totalPoints })}
        </p>
      </header>

      {result ? (
        result.passed ? (
          <div className="mt-4 flex items-center justify-between gap-4 rounded-lg bg-emerald-50 px-4 py-3">
            <div className="flex items-center gap-3">
              <Check className="size-4 shrink-0 text-emerald-600" strokeWidth={3} />
              <div>
                <p className="text-sm font-bold text-primary">
                  {t("scored", { score: result.score, total: result.totalPoints })}
                </p>
                <p className="text-[11px] text-muted-foreground">{t("passedNote")}</p>
              </div>
            </div>

            {/* TODO: there is no "next lesson" page yet, so this returns to the class page. */}
            <Link href="/class" className={cn(buttonVariants(), "h-9 shrink-0 px-5 text-sm font-semibold")}>
              {t("continue")}
            </Link>
          </div>
        ) : (
          <div className="mt-4 flex items-center justify-between gap-4 rounded-lg bg-danger-tint px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-red-500 text-white">
                <X className="size-4" strokeWidth={3} />
              </span>
              <div>
                <p className="text-sm font-bold text-primary">
                  {t("scored", { score: result.score, total: result.totalPoints })}
                </p>
                <p className="text-[11px] text-muted-foreground">
                  {t("failedNote", { passing: result.passingScore, total: result.totalPoints })}
                </p>
              </div>
            </div>

            <div className="flex shrink-0 gap-2">
              <Link
                href="/class"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "h-9 border-primary bg-card px-4 text-xs font-semibold text-primary hover:bg-card",
                )}
              >
                {t("backToClass")}
              </Link>
              <Button
                type="button"
                onClick={retake}
                className="h-9 cursor-pointer bg-red-500 px-4 text-xs font-semibold text-white hover:bg-red-600"
              >
                {t("retake")}
              </Button>
            </div>
          </div>
        )
      ) : (
        <>
          {quiz.lastAttempt && (
            <p className="mt-4 rounded-md bg-tint px-3 py-2 text-[11px] text-foreground">
              {t.rich("lastScore", {
                score: quiz.lastAttempt.score,
                total: quiz.lastAttempt.totalPoints,
                status: quiz.lastAttempt.passed ? t("passed") : t("notPassed"),
                strong: (chunks) => <strong>{chunks}</strong>,
              })}
            </p>
          )}

          <div className="mt-6">
            <div className="flex items-center justify-between text-[11px] text-muted-foreground">
              <span>{t("answered", { answered: answeredCount, total: quiz.questions.length })}</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="mt-1.5" />
          </div>
        </>
      )}

      <div className="mt-8 flex flex-col gap-8">
        {quiz.questions.map((question, index) => (
          <QuizQuestionCard
            key={question.id}
            index={index}
            question={question}
            selected={answers[question.id] ?? []}
            onSelect={(optionId) => selectOption(question, optionId)}
            outcome={outcomeByQuestion.get(question.id)}
          />
        ))}
      </div>

      {!result && (
        <div className="mt-10 flex flex-col items-center gap-2 border-t border-border pt-6">
          <Button
            type="button"
            onClick={submit}
            disabled={!canSubmit}
            className="h-11 w-full max-w-xs cursor-pointer text-sm font-medium disabled:cursor-not-allowed"
          >
            {isSubmitting ? t("submitting") : t("submit")}
          </Button>
          {answeredCount < quiz.questions.length && (
            <p className="text-[11px] text-muted-foreground">{t("answerAll")}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default QuizView;
