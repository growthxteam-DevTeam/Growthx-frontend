"use client";

import { useState } from "react";

import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { ALUMNI_POSTS } from "../_constants";
import type { AlumniFilterId, AlumniPostType } from "../_types";

// Posting and responding have no backend yet, so these only acknowledge the click.
export const useAlumniNetwork = () => {
  const t = useTranslations("Dashboard.alumniNetwork");
  const [activeFilter, setActiveFilter] = useState<AlumniFilterId>("all");
  const [postType, setPostType] = useState<AlumniPostType>("lookingFor");
  const [content, setContent] = useState("");

  const posts = ALUMNI_POSTS.filter(
    (post) => activeFilter === "all" || post.type === activeFilter || post.topics.includes(activeFilter),
  );

  const comingSoon = () => toast.info(t("comingSoon"));

  const submitPost = () => {
    if (content.trim().length === 0) return;
    comingSoon();
  };

  return {
    activeFilter,
    setActiveFilter,
    postType,
    setPostType,
    content,
    setContent,
    posts,
    submitPost,
    comingSoon,
  };
};
