import { Reply, Sparkles, Tag } from "lucide-react";

import Avatar from "../../_components/Avatar";
import type { CommunityPost } from "../_types";

const CommunityPostCard = ({ post }: { post: CommunityPost }) => (
  <article className="rounded-xl border border-border bg-card p-5">
    <div className="flex items-start justify-between gap-3">
      <div className="flex items-center gap-3">
        <Avatar name={post.author} className="size-9 bg-tint-strong text-xs text-primary" />
        <div>
          <p className="text-sm font-bold text-primary">{post.author}</p>
          <p className="text-xs text-muted-foreground">
            {post.topic} · {post.postedAt}
          </p>
        </div>
      </div>
      <Tag className="size-4 shrink-0 text-muted-foreground/50" />
    </div>

    <p className="mt-3 text-sm text-foreground">{post.content}</p>

    {post.answeredByAlumna && (
      <div className="mt-3 flex items-center gap-2 rounded-lg bg-tint px-4 py-2.5 text-sm font-semibold text-primary">
        <Sparkles className="size-4 shrink-0" />
        Answered by a Growth Space alumna
      </div>
    )}

    <div className="mt-3 flex items-center gap-4 text-[13px] text-muted-foreground">
      <span>{post.replies} replies</span>
      <span>{post.likes} likes</span>
      <button type="button" className="flex items-center gap-1.5 font-semibold text-primary hover:underline">
        <Reply className="size-3.5" />
        Reply
      </button>
    </div>
  </article>
);

export default CommunityPostCard;
