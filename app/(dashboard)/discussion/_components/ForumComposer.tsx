"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import Avatar from "../../_components/Avatar";
import { useDashboard } from "../../dashboard/_hooks/useDashboard";

const MAX_LENGTH = 1000;

interface ForumComposerProps {
  /** Resolves to whether the contribution was saved; the box only clears on success. */
  onSubmit: (content: string) => Promise<boolean>;
  isSubmitting: boolean;
}

const ForumComposer = ({ onSubmit, isSubmitting }: ForumComposerProps) => {
  const { name, profilePicture } = useDashboard();
  const [content, setContent] = useState("");
  const canSubmit = content.trim().length > 0 && !isSubmitting;

  const submit = async () => {
    if (!canSubmit) return;
    if (await onSubmit(content.trim())) setContent("");
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        void submit();
      }}
      className="flex min-h-56 flex-col rounded-lg border border-border bg-card p-4"
    >
      <label htmlFor="forum-contribution" className="text-xs text-muted-foreground">
        Add contribution
      </label>

      <div className="mt-3 flex items-start gap-3">
        <Avatar name={name} src={profilePicture} className="size-8 bg-tint-strong text-[10px] text-primary" />
        <textarea
          id="forum-contribution"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          onKeyDown={(event) => {
            // Enter posts; Shift+Enter inserts a new line.
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              void submit();
            }
          }}
          rows={5}
          maxLength={MAX_LENGTH}
          placeholder="Add a contribution..."
          className="flex-1 resize-none border-b border-border bg-transparent pb-2 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-field-focus"
        />
      </div>

      <div className="mt-auto flex justify-end pt-3">
        <Button type="submit" disabled={!canSubmit} className="h-9 cursor-pointer px-5 text-xs font-semibold">
          {isSubmitting ? "Posting..." : "Post"}
        </Button>
      </div>
    </form>
  );
};

export default ForumComposer;
