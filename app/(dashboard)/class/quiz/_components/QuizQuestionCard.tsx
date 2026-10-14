import { cn } from "@/lib/utils";
import type { QuizQuestion } from "@/redux/features/quiz/quizApi";

interface QuizQuestionCardProps {
  index: number;
  question: QuizQuestion;
  selected: string[];
  onSelect: (optionId: string) => void;
  /** After submitting: whether this question was answered correctly. Undefined while taking the quiz. */
  correct?: boolean;
}

const QuizQuestionCard = ({ index, question, selected, onSelect, correct }: QuizQuestionCardProps) => {
  const isSingle = question.type === "single";
  const isLocked = correct !== undefined;

  return (
    <fieldset className="flex flex-col gap-3">
      <legend className="sr-only">{question.text}</legend>

      <div className="flex items-start justify-between gap-4">
        <p className="flex gap-3 text-sm font-semibold text-primary" aria-hidden>
          <span>{index + 1}</span>
          <span>{question.text}</span>
        </p>

        <span
          className={cn(
            "shrink-0 rounded-full px-2 py-0.5 text-[10px]",
            correct === undefined && "bg-[#f5f4fc] text-muted-foreground",
            correct === true && "bg-emerald-50 font-semibold text-emerald-600",
            correct === false && "bg-red-50 font-semibold text-red-500",
          )}
        >
          {correct === undefined
            ? `${question.points} ${question.points === 1 ? "point" : "points"}`
            : correct
              ? "Correct"
              : "Incorrect"}
        </span>
      </div>

      <p className="pl-6 text-[11px] text-muted-foreground">
        {isSingle ? "Single-select question" : "Multi-select question"}
      </p>

      <div className="flex flex-col gap-2.5 pl-6">
        {question.options.map((option) => (
          <label
            key={option.id}
            className={cn(
              "flex items-center gap-2.5 text-xs text-foreground",
              isLocked ? "cursor-default" : "cursor-pointer",
            )}
          >
            <input
              type={isSingle ? "radio" : "checkbox"}
              name={question.id}
              checked={selected.includes(option.id)}
              onChange={() => onSelect(option.id)}
              disabled={isLocked}
              className="size-4 shrink-0 cursor-pointer accent-primary disabled:cursor-default"
            />
            {option.text}
          </label>
        ))}
      </div>
    </fieldset>
  );
};

export default QuizQuestionCard;
