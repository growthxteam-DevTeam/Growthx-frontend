export type CommunityTopicId = "all" | "fundraising" | "pricing" | "hiring" | "product" | "wins";

export interface CommunityPost {
  /** Also the key of the post's text under `Dashboard.community.posts`. */
  id: string;
  author: string;
  topic: Exclude<CommunityTopicId, "all">;
  /** Rendered as "2h" / "1d" in the viewer's language. */
  postedAt: { value: number; unit: "hours" | "days" };
  replies: number;
  likes: number;
  /** Shows the "Answered by a Growth Space alumna" banner. */
  answeredByAlumna?: boolean;
}
