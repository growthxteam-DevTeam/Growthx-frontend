import type { ResourceCategory } from "@/redux/features/resources/resourcesApi";

export interface ResourceTab {
  id: ResourceCategory;
  label: string;
}
