import type { AlumniFilterId, AlumniPost, AlumniPostType, PointRule, TopContributor } from "../_types";

// TODO: placeholder content from the design — replace with API data once alumni network endpoints exist.
// Post copy lives under `Dashboard.alumniNetwork.post.content.<id>` in the message files.
export const ALUMNI_FILTERS: AlumniFilterId[] = [
  "all",
  "lookingFor",
  "offering",
  "coFounder",
  "investorIntro",
  "productFeedback",
];

export const ALUMNI_POST_TYPES: AlumniPostType[] = ["lookingFor", "offering"];

export const ALUMNI_POSTS: AlumniPost[] = [
  {
    id: "1",
    author: "Ada O.",
    cohort: 4,
    role: "Builder",
    type: "lookingFor",
    topics: ["coFounder"],
    responses: 3,
    action: "respond",
  },
  {
    id: "2",
    author: "Tunde A.",
    cohort: 2,
    role: "Connector",
    type: "offering",
    topics: ["investorIntro"],
    responses: 3,
    action: "requestIntro",
  },
  {
    id: "3",
    author: "Grace M.",
    cohort: 5,
    role: "Member",
    type: "lookingFor",
    topics: ["productFeedback"],
    responses: 5,
    action: "giveFeedback",
  },
];

export const ALUMNI_POINTS = { total: 420, goal: 600 };

export const ALUMNI_REFERRALS = { made: 3, received: 1 };

export const TOP_CONTRIBUTORS: TopContributor[] = [
  { name: "Tunde A.", points: 124 },
  { name: "Grace M.", points: 98 },
  { name: "Ada O.", points: 85 },
];

export const POINT_RULES: PointRule[] = [
  { id: "referralMade", points: 20 },
  { id: "referralLed", points: 50 },
  { id: "coFounderMatch", points: 40 },
  { id: "feedbackGiven", points: 15 },
  { id: "markedHelpful", points: 10 },
];
