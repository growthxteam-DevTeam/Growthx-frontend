"use client";

import { Award, ClipboardList } from "lucide-react";
import Link from "next/link";

import { Button, buttonVariants } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

import { useQuiz } from "../_hooks/useQuiz";
import QuizQuestionCard from "./QuizQuestionCard";

const QuizView = () => {
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

  if (isLoading) return <p className="text-sm text-muted-foreground">Loading quiz...</p>;
  if (isError || !quiz)
    return <p className="text-sm text-destructive">Could not load the quiz. Please try again shortly.</p>;

  const correctByQuestion = new Map(result?.results.map((item) => [item.questionId, item.correct]));

  return (
    <div className="mx-auto w-full max-w-3xl rounded-xl border border-border bg-white p-6 shadow-sm">
      <header className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
            <ClipboardList className="size-4" />
          </span>
          <div>
            <h1 className="text-base font-bold text-primary">{quiz.title}</h1>
            <p className="text-[11px] text-muted-foreground">
              {quiz.subtitle} · {quiz.questions.length} questions
            </p>
          </div>
        </div>

        <p className="flex shrink-0 items-center gap-1.5 text-[11px] text-muted-foreground">
          <Award className="size-3.5" />
          Passing score: {quiz.passingScore}/{quiz.totalPoints}
        </p>
      </header>

      {result ? (
        <div
          className={cn(
            "mt-6 rounded-lg border p-5 text-center",
            result.passed ? "border-emerald-200 bg-emerald-50" : "border-red-200 bg-red-50",
          )}
        >
          <p className="text-xs text-muted-foreground">Your score</p>
          <p className="mt-1 text-3xl font-bold text-primary">
            {result.score}/{result.totalPoints}
          </p>
          <p className={cn("mt-1 text-sm font-semibold", result.passed ? "text-emerald-700" : "text-red-600")}>
            {result.passed ? "You passed!" : `Not passed yet — you need ${result.passingScore}/${result.totalPoints}.`}
          </p>
          <div className="mt-4 flex justify-center gap-3">
            <Button type="button" onClick={retake} className="h-9 cursor-pointer px-4 text-xs">
              Retake Quiz
            </Button>
            <Link
              href="/class"
              className={cn(buttonVariants({ variant: "outline" }), "h-9 border-primary px-4 text-xs text-primary")}
            >
              Back to class
            </Link>
          </div>
        </div>
      ) : (
        quiz.lastAttempt && (
          <p className="mt-4 rounded-md bg-[#f5f4fc] px-3 py-2 text-[11px] text-foreground">
            Your last score:{" "}
            <strong>
              {quiz.lastAttempt.score}/{quiz.lastAttempt.totalPoints}
            </strong>{" "}
            · {quiz.lastAttempt.passed ? "Passed" : "Not passed"}. You can take it again.
          </p>
        )
      )}

      <div className="mt-6">
        <div className="flex items-center justify-between text-[11px] text-muted-foreground">
          <span>
            {answeredCount} of {quiz.questions.length} answered
          </span>
          <span>{progress}%</span>
        </div>
        <Progress value={progress} className="mt-1.5" />
      </div>

      <div className="mt-8 flex flex-col gap-8">
        {quiz.questions.map((question, index) => (
          <QuizQuestionCard
            key={question.id}
            index={index}
            question={question}
            selected={answers[question.id] ?? []}
            onSelect={(optionId) => selectOption(question, optionId)}
            correct={correctByQuestion.get(question.id)}
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
            {isSubmitting ? "Submitting..." : "Submit Quiz"}
          </Button>
          {answeredCount < quiz.questions.length && (
            <p className="text-[11px] text-muted-foreground">Answer all questions to submit.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default QuizView;
