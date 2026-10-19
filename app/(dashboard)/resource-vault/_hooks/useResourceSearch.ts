"use client";

import { useEffect, useState } from "react";

import { RESOURCES } from "../_constants";

// TODO: stands in for a request to a resource-matching endpoint; swap the timer for the real call.
const SEARCH_DELAY_MS = 900;
const MIN_KEYWORD_LENGTH = 4;

const matchResources = (term: string) => {
  if (!term) return RESOURCES;

  const keywords = term.toLowerCase().split(/\s+/).filter((word) => word.length >= MIN_KEYWORD_LENGTH);
  const needles = keywords.length > 0 ? keywords : [term.toLowerCase()];

  return RESOURCES.filter((resource) => {
    const haystack = `${resource.title} ${resource.tag} ${resource.sourceLabel}`.toLowerCase();
    return needles.some((needle) => haystack.includes(needle));
  });
};

export const useResourceSearch = () => {
  const [query, setQuery] = useState("");
  const [settledQuery, setSettledQuery] = useState("");

  useEffect(() => {
    const next = query.trim();
    const timer = setTimeout(() => setSettledQuery(next), next ? SEARCH_DELAY_MS : 0);
    return () => clearTimeout(timer);
  }, [query]);

  const term = query.trim() ? settledQuery : "";

  return {
    query,
    setQuery,
    isSearching: Boolean(query.trim()) && query.trim() !== settledQuery,
    resources: matchResources(term),
  };
};
