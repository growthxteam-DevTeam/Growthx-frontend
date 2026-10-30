import type { CommunityPost, CommunityTopicId } from "../_types";

// TODO: placeholder content from the design — replace with API data once community endpoints exist.
// All visible text (titles, topic names, post bodies) lives in the `Dashboard.community` messages.
export const TOPIC_IDS: CommunityTopicId[] = ["all", "fundraising", "pricing", "hiring", "product", "wins"];

export const COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: "1",
    author: "Chiamaka N.",
    topic: "pricing",
    postedAt: { value: 2, unit: "hours" },
    replies: 12,
    likes: 2,
    answeredByAlumna: true,
  },
  { id: "2", author: "Fatima S.", topic: "wins", postedAt: { value: 1, unit: "days" }, replies: 6, likes: 20 },
  { id: "3", author: "Aduke S.", topic: "hiring", postedAt: { value: 1, unit: "days" }, replies: 6, likes: 20 },
  { id: "4", author: "Ajayi M.", topic: "product", postedAt: { value: 1, unit: "days" }, replies: 4, likes: 11 },
  { id: "5", author: "Grace M.", topic: "fundraising", postedAt: { value: 2, unit: "days" }, replies: 8, likes: 15 },
];

export const FOUNDERS_GALLERY = {
  memberCount: 8,
};

export const ALUMNI_NETWORK = {
  href: "/community/alumni-network",
  // TODO: unlocked for everyone for now; gate on a graduation status once one exists (backend + auth user).
  unlocked: true,
};

export const BADGE_PROGRESS = {
  completedMilestones: 2,
  totalMilestones: 3,
};

export const TRENDING_TOPIC_IDS = ["fundraising", "pricing", "demoDay"] as const;
