export type AlumniFilterId =
  | "all"
  | "lookingFor"
  | "offering"
  | "coFounder"
  | "investorIntro"
  | "productFeedback";

/** The post types a member can publish; they double as the badge shown on a post. */
export type AlumniPostType = Extract<AlumniFilterId, "lookingFor" | "offering">;

export type AlumniPostAction = "respond" | "requestIntro" | "giveFeedback";

export interface AlumniPost {
  id: string;
  author: string;
  cohort: number;
  role: string;
  type: AlumniPostType;
  /** Extra filter tabs this post also shows under, besides "All" and its own type. */
  topics: AlumniFilterId[];
  responses: number;
  action: AlumniPostAction;
}

export interface TopContributor {
  name: string;
  points: number;
}

export type PointRuleId =
  | "referralMade"
  | "referralLed"
  | "coFounderMatch"
  | "feedbackGiven"
  | "markedHelpful";

export interface PointRule {
  id: PointRuleId;
  points: number;
}
