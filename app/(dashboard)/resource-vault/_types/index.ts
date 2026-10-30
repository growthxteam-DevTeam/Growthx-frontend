import type { ResourceCategory } from "@/redux/features/resources/resourcesApi";

export interface ResourceTab {
  /** Also the key of the tab's label under `Dashboard.vault.tabs`. */
  id: ResourceCategory;
}
