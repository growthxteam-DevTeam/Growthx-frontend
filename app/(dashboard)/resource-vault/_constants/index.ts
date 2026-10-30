import type { ResourceTab } from "../_types";

// Visible text lives in the `Dashboard.vault` translation messages.
export const RESOURCE_TABS: ResourceTab[] = [{ id: "pre-seed" }, { id: "pitch" }, { id: "raise" }, { id: "pricing" }];

// Subtitle-bar widths for the three loading cards, varied so they don't look identical.
export const SKELETON_SUBTITLE_WIDTHS = ["w-[18%]", "w-[16%]", "w-[20%]"];

// TODO: placeholder content from the design, replace with the applicant's real profile once a profile endpoint exists.
export const PROFILE_TAG_IDS = ["preRevenue", "fintech", "lagos"] as const;
