import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";
import type { QuizQuestion } from "@/redux/features/quiz/quizApi";

interface QuizQuestionCardProps {
  index: number;
  question: QuizQuestion;
  selected: string[];
  onSelect: (optionId: string) => void;
  /** After submitting: how this question was marked. Undefined while taking the quiz. */
  outcome?: { correct: boolean; explanation: string };
}

const QuizQuestionCard = ({ index, question, selected, onSelect, outcome }: QuizQuestionCardProps) => {
  const t = useTranslations("Dashboard.quiz.question");
  const isSingle = question.type === "single";
  const isLocked = outcome !== undefined;

  return (
    <fieldset className="flex flex-col gap-3">
      <legend className="sr-only">{question.text}</legend>

      <div className="flex items-start justify-between gap-4">
        <p className="flex gap-3 text-sm font-semibold text-primary" aria-hidden>
          <span>{index + 1}</span>
          <span>{question.text}</span>
        </p>

        <span className="shrink-0 rounded-full bg-tint px-2 py-0.5 text-[10px] text-muted-foreground">
          {t("points", { count: question.points })}
        </span>
      </div>

      <p className="pl-6 text-[11px] text-muted-foreground">{isSingle ? t("single") : t("multi")}</p>

      <div className="flex flex-col gap-2.5 pl-6">
        {question.options.map((option) => (
          <label
            key={option.id}
            className={cn(
              "flex items-center gap-2.5 text-xs text-foreground",
              isLocked ? "pointer-events-none" : "cursor-pointer",
            )}
          >
            <input
              type={isSingle ? "radio" : "checkbox"}
              name={question.id}
              checked={selected.includes(option.id)}
              onChange={() => onSelect(option.id)}
              tabIndex={isLocked ? -1 : 0}
              className="size-4 shrink-0 cursor-pointer accent-primary"
            />
            {option.text}
          </label>
        ))}
      </div>

      {outcome && (
        <p className={cn("pl-6 text-[10px]", outcome.correct ? "text-muted-foreground" : "text-red-500")}>
          {outcome.correct ? t("correct") : t("incorrect")} {outcome.explanation}
        </p>
      )}
    </fieldset>
  );
};

export default QuizQuestionCard;
