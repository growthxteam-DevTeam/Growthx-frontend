"use client";

import PageHeader from "../../_components/PageHeader";
import { COMMUNITY } from "../_constants";

const CommunityHeader = () => (
  <PageHeader>
    <h1 className="text-2xl font-bold text-foreground">{COMMUNITY.title}</h1>
  </PageHeader>
);

export default CommunityHeader;
