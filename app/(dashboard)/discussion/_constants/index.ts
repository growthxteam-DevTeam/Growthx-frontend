import type { CommentSort } from "@/redux/features/discussion/discussionApi";

// TODO: placeholder content — the topic and program details should come from the API; only admins
// should be able to change the topic.
export const FORUM = {
  // Also the comment thread key on the backend.
  id: "zero-to-launch-forum",
  label: "Discussion Forum",
  program: "Zero to Launch",
  duration: "6 weeks Program",
  topicTitle: "Discussion Topic",
  topic: "What is customer interview script? share your ideas everyone",
  topicNote: "only admins can edit topic",
};

export const SORT_OPTIONS: { value: CommentSort; label: string }[] = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "top", label: "Top" },
];
