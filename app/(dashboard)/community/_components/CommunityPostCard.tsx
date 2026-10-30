import { Reply, Sparkles, Tag } from "lucide-react";
import { useTranslations } from "next-intl";

import Avatar from "../../_components/Avatar";
import type { CommunityPost } from "../_types";

const CommunityPostCard = ({ post }: { post: CommunityPost }) => {
  const t = useTranslations("Dashboard.community");

  return (
    <article className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <Avatar name={post.author} className="size-9 bg-tint-strong text-xs text-primary" />
          <div>
            <p className="text-sm font-bold text-primary">{post.author}</p>
            <p className="text-xs text-muted-foreground">
              {t(`topics.${post.topic}`)} · {t(`ago.${post.postedAt.unit}`, { count: post.postedAt.value })}
            </p>
          </div>
        </div>
        <Tag className="size-4 shrink-0 text-muted-foreground/50" />
      </div>

      <p className="mt-3 text-sm text-foreground">{t(`posts.${post.id}`)}</p>

      {post.answeredByAlumna && (
        <div className="mt-3 flex items-center gap-2 rounded-lg bg-tint px-4 py-2.5 text-sm font-semibold text-primary">
          <Sparkles className="size-4 shrink-0" />
          {t("answeredByAlumna")}
        </div>
      )}

      <div className="mt-3 flex items-center gap-4 text-[13px] text-muted-foreground">
        <span>{t("replies", { count: post.replies })}</span>
        <span>{t("likes", { count: post.likes })}</span>
        <button type="button" className="flex items-center gap-1.5 font-semibold text-primary hover:underline">
          <Reply className="size-3.5" />
          {t("reply")}
        </button>
      </div>
    </article>
  );
};

export default CommunityPostCard;
