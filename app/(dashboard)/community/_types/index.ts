export interface CommunityTopic {
  id: string;
  label: string;
}

export interface CommunityPost {
  id: string;
  author: string;
  topic: string;
  postedAt: string;
  content: string;
  replies: number;
  likes: number;
  /** Shows the "Answered by a Growth Space alumna" banner. */
  answeredByAlumna?: boolean;
}
