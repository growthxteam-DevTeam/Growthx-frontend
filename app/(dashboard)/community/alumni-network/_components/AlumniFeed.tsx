"use client";

import { useTranslations } from "next-intl";

import { useAlumniNetwork } from "../_hooks/useAlumniNetwork";
import AlumniPostCard from "./AlumniPostCard";
import FilterTabs from "./FilterTabs";
import PostComposer from "./PostComposer";

const AlumniFeed = () => {
  const t = useTranslations("Dashboard.alumniNetwork");
  const { activeFilter, setActiveFilter, postType, setPostType, content, setContent, posts, submitPost, comingSoon } =
    useAlumniNetwork();

  return (
    <div className="flex min-w-0 flex-col gap-6">
      <FilterTabs activeFilter={activeFilter} onSelect={setActiveFilter} />

      <PostComposer
        postType={postType}
        onPostTypeChange={setPostType}
        content={content}
        onContentChange={setContent}
        onSubmit={submitPost}
      />

      {posts.length === 0 ? (
        <p className="rounded-lg border border-border bg-card p-[19px] text-sm text-muted-foreground">{t("empty")}</p>
      ) : (
        <ul className="flex flex-col gap-4">
          {posts.map((post) => (
            <li key={post.id}>
              <AlumniPostCard post={post} onAction={comingSoon} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AlumniFeed;
