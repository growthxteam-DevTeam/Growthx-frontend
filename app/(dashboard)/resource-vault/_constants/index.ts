import { FileText, SquarePlay, Users } from "lucide-react";

import type { ResourceItem } from "../_types";

// TODO: placeholder content from the design — replace with API data once resource and profile endpoints exist.
export const RESOURCE_VAULT = {
  title: "Resource Vault",
  headline: "Find exactly what fits your situation, not generic search results.",
  searchPlaceholder: "What are you stuck on? e.g. negotiating a lease",
  searchingMessage: "Matching resources to your question...",
};

// Subtitle-bar widths for the three loading cards, varied so they don't look identical.
export const SKELETON_SUBTITLE_WIDTHS = ["w-[18%]", "w-[16%]", "w-[20%]"];

export const PROFILE_TAGS = ["Pre-revenue", "Fintech", "Lagos"];

export const RESOURCES: ResourceItem[] = [
  {
    id: "1",
    sourceLabel: "YouTube",
    sourceIcon: SquarePlay,
    typeBadge: "4 min",
    title: "Pricing your product when you have zero case studies",
    recommended: true,
    tag: "Pricing",
  },
  {
    id: "2",
    sourceLabel: "Submitted by Tunde A., alumnus",
    sourceIcon: Users,
    typeBadge: "6 min",
    title: "How I priced my first logistics contract",
    recommended: true,
    tag: "Pricing",
  },
  {
    id: "3",
    sourceLabel: "Growth Space template · PDF",
    sourceIcon: FileText,
    typeBadge: "PDF",
    title: "Cost-plus vs. value-based pricing worksheet",
    recommended: true,
    tag: "Pricing",
  },
];
