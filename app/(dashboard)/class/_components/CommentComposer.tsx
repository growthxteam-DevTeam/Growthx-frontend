"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface CommentComposerProps {
  placeholder: string;
  submitLabel: string;
  /** Resolves to whether the comment was saved; the input only clears on success. */
  onSubmit: (content: string) => Promise<boolean>;
  isSubmitting?: boolean;
  onCancel?: () => void;
  autoFocus?: boolean;
}

const MAX_LENGTH = 1000;

const CommentComposer = ({
  placeholder,
  submitLabel,
  onSubmit,
  isSubmitting,
  onCancel,
  autoFocus,
}: CommentComposerProps) => {
  const [content, setContent] = useState("");
  const canSubmit = content.trim().length > 0 && !isSubmitting;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!canSubmit) return;
    if (await onSubmit(content.trim())) setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-1 items-center gap-2">
      <Input
        value={content}
        onChange={(event) => setContent(event.target.value)}
        placeholder={placeholder}
        maxLength={MAX_LENGTH}
        autoFocus={autoFocus}
        aria-label={placeholder}
        className="h-9 flex-1 text-xs"
      />
      {onCancel && (
        <Button type="button" variant="ghost" onClick={onCancel} className="h-9 text-xs">
          Cancel
        </Button>
      )}
      <Button type="submit" disabled={!canSubmit} className="h-9 px-4 text-xs">
        {submitLabel}
      </Button>
    </form>
  );
};

export default CommentComposer;
