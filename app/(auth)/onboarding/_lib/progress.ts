import { ONBOARDING_TABS, type OnboardingTabId } from "../_constants";

// Progress is the active tab's position among the enabled tabs, so the final tab always reads 100%.
export const getOnboardingProgress = (activeTab: OnboardingTabId) => {
  const enabledTabs = ONBOARDING_TABS.filter((tab) => tab.enabled);
  const activeIndex = Math.max(
    enabledTabs.findIndex((tab) => tab.id === activeTab),
    0,
  );

  return Math.round(((activeIndex + 1) / enabledTabs.length) * 100);
};
