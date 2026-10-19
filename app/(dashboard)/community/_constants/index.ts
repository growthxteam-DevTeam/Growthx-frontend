import type { CommunityPost, CommunityTopic } from "../_types";

// TODO: placeholder content from the design — replace with API data once community endpoints exist.
export const COMMUNITY = {
  title: "General Community",
  prompt: "Ask anything, even if it feels basic, this is where founders figure things out together.",
};

export const TOPICS: CommunityTopic[] = [
  { id: "all", label: "All" },
  { id: "fundraising", label: "Fundraising" },
  { id: "pricing", label: "Pricing" },
  { id: "hiring", label: "Hiring" },
  { id: "product", label: "Product" },
  { id: "wins", label: "Wins" },
];

export const COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: "1",
    author: "Chiamaka N.",
    topic: "Pricing",
    postedAt: "2h",
    content: "How did others validate pricing before getting a first paying customer?",
    replies: 12,
    likes: 2,
    answeredByAlumna: true,
  },
  {
    id: "2",
    author: "Fatima S.",
    topic: "Wins",
    postedAt: "1d",
    content: "Just closed our first B2B contract 🎉 Six months of outreach paid off.",
    replies: 6,
    likes: 20,
  },
  {
    id: "3",
    author: "Aduke S.",
    topic: "Hiring",
    postedAt: "1d",
    content: "Anyone hired a part-time CFO at an early stage? How did you structure it?",
    replies: 6,
    likes: 20,
  },
  {
    id: "4",
    author: "Ajayi M.",
    topic: "Product",
    postedAt: "1d",
    content: "What's everyone using to collect user feedback pre-launch?",
    replies: 4,
    likes: 11,
  },
  {
    id: "5",
    author: "Grace M.",
    topic: "Fundraising",
    postedAt: "2d",
    content: "How much runway did you raise for before approaching investors again?",
    replies: 8,
    likes: 15,
  },
];

export const FOUNDERS_GALLERY = {
  title: "Founder's Gallery",
  memberCount: 8,
};

export const ALUMNI_NETWORK = {
  title: "Alumni Network",
  teaser:
    "This answer came from a founder in the Alumni Network, where graduates swap investor intros and co-founder leads.",
  unlockLabel: "Unlocks at graduation",
};

export const BADGE_PROGRESS = {
  title: "Your badge progress",
  completedMilestones: 2,
  totalMilestones: 3,
  note: "keep going",
};

export const TRENDING_TOPICS = ["Fundraising", "Pricing", "Demo Day"];
