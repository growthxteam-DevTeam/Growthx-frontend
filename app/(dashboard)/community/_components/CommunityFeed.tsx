"use client";

import { useState } from "react";

import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { COMMUNITY_POSTS } from "../_constants";
import AskComposer from "./AskComposer";
import CommunityPostCard from "./CommunityPostCard";
import TopicsSidebar from "./TopicsSidebar";

const CommunityFeed = () => {
  const t = useTranslations("Dashboard.community");
  const tc = useTranslations("Dashboard.common");
  // TODO: posting has no backend yet, so the composer only acknowledges the click.
  const notifyComingSoon = async () => {
    toast.info(tc("comingSoon"));
    return false;
  };
  const [activeTopic, setActiveTopic] = useState("all");

  const posts = activeTopic === "all" ? COMMUNITY_POSTS : COMMUNITY_POSTS.filter((post) => post.topic === activeTopic);

  return (
    <div className="grid gap-8 md:grid-cols-[176px_1fr]">
      <TopicsSidebar activeTopic={activeTopic} onSelect={setActiveTopic} />

      <div className="min-w-0">
        <p className="text-base text-foreground">{t("prompt")}</p>

        <div className="mt-4">
          <AskComposer onSubmit={notifyComingSoon} />
        </div>

        <ul className="mt-6 flex flex-col gap-4">
          {posts.map((post) => (
            <li key={post.id}>
              <CommunityPostCard post={post} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CommunityFeed;
