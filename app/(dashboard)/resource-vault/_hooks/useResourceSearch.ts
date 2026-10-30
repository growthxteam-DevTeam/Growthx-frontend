"use client";

import { useEffect, useState } from "react";

import { useGetResourcesQuery, type ResourceCategory } from "@/redux/features/resources/resourcesApi";

import { RESOURCE_TABS } from "../_constants";

const SEARCH_DEBOUNCE_MS = 400;

export const useResourceSearch = () => {
  const [category, setCategory] = useState<ResourceCategory>(RESOURCE_TABS[0].id);
  const [query, setQuery] = useState("");
  const [settledQuery, setSettledQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setSettledQuery(query.trim()), SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [query]);

  // Typing searches the whole vault; the tab only applies while the search box is empty.
  const isSearchingAll = Boolean(settledQuery);
  const { data, isFetching, isError, refetch } = useGetResourcesQuery({
    category: isSearchingAll ? undefined : category,
    q: settledQuery || undefined,
  });

  const selectCategory = (next: ResourceCategory) => {
    setQuery("");
    setSettledQuery("");
    setCategory(next);
  };

  return {
    query,
    setQuery,
    category,
    selectCategory,
    isSearchingAll,
    isLoading: isFetching || query.trim() !== settledQuery,
    isError,
    refetch,
    resources: data ?? [],
  };
};
