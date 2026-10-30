import type { ResourceTab } from "../_types";

export const RESOURCE_VAULT = {
  title: "Resource Vault",
  headline: "Find exactly what fits your situation, not generic search results.",
  searchPlaceholder: "What are you stuck on? e.g. negotiating a lease",
  searchingMessage: "Matching resources to your question...",
};

export const RESOURCE_TABS: ResourceTab[] = [
  { id: "pre-seed", label: "Pre-seed" },
  { id: "pitch", label: "Pitch" },
  { id: "raise", label: "Raise" },
  { id: "pricing", label: "Pricing" },
];

// Subtitle-bar widths for the three loading cards, varied so they don't look identical.
export const SKELETON_SUBTITLE_WIDTHS = ["w-[18%]", "w-[16%]", "w-[20%]"];

// TODO: placeholder content from the design, replace with the applicant's real profile once a profile endpoint exists.
export const PROFILE_TAGS = ["Pre-revenue", "Fintech", "Lagos"];
