"use client";

import type { FormEvent } from "react";

import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { ALUMNI_POST_TYPES } from "../_constants";
import type { AlumniPostType } from "../_types";

const MAX_LENGTH = 1000;

interface PostComposerProps {
  postType: AlumniPostType;
  onPostTypeChange: (type: AlumniPostType) => void;
  content: string;
  onContentChange: (content: string) => void;
  onSubmit: () => void;
}

const PostComposer = ({ postType, onPostTypeChange, content, onContentChange, onSubmit }: PostComposerProps) => {
  const t = useTranslations("Dashboard.alumniNetwork");

  const items = ALUMNI_POST_TYPES.map((type) => ({ value: type, label: t(`filters.${type}`) }));

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-lg border border-border bg-card p-[15px]">
      <Select
        items={items}
        value={postType}
        onValueChange={(value) => value && onPostTypeChange(value as AlumniPostType)}
      >
        <SelectTrigger
          aria-label={t("composer.typeLabel")}
          className="data-[size=default]:h-9 gap-2 rounded-md border-border bg-background px-3 text-sm text-foreground dark:bg-background dark:hover:bg-background"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent alignItemWithTrigger={false} align="start">
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Input
        value={content}
        onChange={(event) => onContentChange(event.target.value)}
        placeholder={t("composer.placeholder")}
        maxLength={MAX_LENGTH}
        aria-label={t("composer.inputLabel")}
        className="mt-3 h-12 rounded-md border-border bg-background px-3 text-[15px] dark:bg-background"
      />

      <div className="mt-3 flex items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">{t("composer.visibility")}</p>
        <Button type="submit" className="h-15 rounded-md px-4 text-xl font-semibold">
          {t("composer.post")}
        </Button>
      </div>
    </form>
  );
};

export default PostComposer;
