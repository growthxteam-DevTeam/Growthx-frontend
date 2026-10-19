"use client";

import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import Avatar from "../../_components/Avatar";
import { useDashboard } from "../../dashboard/_hooks/useDashboard";

const MAX_LENGTH = 1000;

interface AskComposerProps {
  /** Resolves to whether the post was saved; the input only clears on success. */
  onSubmit: (content: string) => Promise<boolean>;
}

const AskComposer = ({ onSubmit }: AskComposerProps) => {
  const { name, profilePicture } = useDashboard();
  const [content, setContent] = useState("");
  const canSubmit = content.trim().length > 0;

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!canSubmit) return;
    if (await onSubmit(content.trim())) setContent("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-3 rounded-xl border border-border bg-tint-soft p-4"
    >
      <Avatar name={name} src={profilePicture} className="size-9 bg-tint-strong text-xs text-primary" />
      <Input
        value={content}
        onChange={(event) => setContent(event.target.value)}
        placeholder="Ask anything..."
        maxLength={MAX_LENGTH}
        aria-label="Ask anything"
        className="h-auto flex-1 border-none bg-transparent p-0 text-sm shadow-none focus-visible:ring-0"
      />
      <Button type="submit" disabled={!canSubmit} className="h-10 shrink-0 px-6 text-sm font-semibold">
        Post
      </Button>
    </form>
  );
};

export default AskComposer;
