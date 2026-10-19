"use client";

import PageHeader from "../../_components/PageHeader";
import { RESOURCE_VAULT } from "../_constants";

const ResourceVaultHeader = () => (
  <PageHeader>
    <h1 className="text-2xl font-bold text-foreground">{RESOURCE_VAULT.title}</h1>
  </PageHeader>
);

export default ResourceVaultHeader;
