'use client';

import { ColumnDef } from '@tanstack/react-table';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Search,
  SlidersHorizontal,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import DataTable from '@/components/ui/dataTable';
import TableSkeleton from '@/components/common/Loaders/TableSkeleton';
import { useDebounce } from '@/hooks/useDebounce';

const PAGE_SIZE_OPTIONS = [10, 20, 50];

interface ResourceTableProps<TData, TValue> {
  readonly title: string;
  readonly subtitle?: string;
  readonly columns: ColumnDef<TData, TValue>[];
  readonly data: TData[];
  readonly totalCount: number;
  readonly page: number;
  readonly pageSize: number;
  readonly isLoading?: boolean;
  readonly isRefreshing?: boolean;
  readonly searchPlaceholder?: string;
  readonly onSearch?: (query: string) => void;
  readonly onPageChange: (page: number) => void;
  readonly onPageSizeChange: (size: number) => void;
  readonly onRefresh?: () => void;
  readonly onFilterClick?: () => void;
  readonly filterCount?: number;
  readonly headerAction?: React.ReactNode;
  readonly emptyDataMessage?: string | React.ReactNode;
}

function ResourceTable<TData, TValue>({
  title,
  subtitle,
  columns,
  data,
  totalCount,
  page,
  pageSize,
  isLoading,
  isRefreshing,
  searchPlaceholder = 'Search',
  onSearch,
  onPageChange,
  onPageSizeChange,
  onRefresh,
  onFilterClick,
  filterCount = 0,
  headerAction,
  emptyDataMessage,
}: ResourceTableProps<TData, TValue>) {
  const [searchInput, setSearchInput] = useState('');
  const debouncedSearch = useDebounce(searchInput);
  const onSearchRef = useRef(onSearch);
  useEffect(() => {
    onSearchRef.current = onSearch;
  });

  useEffect(() => {
    onSearchRef.current?.(debouncedSearch);
  }, [debouncedSearch]);

  const from = totalCount === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, totalCount);
  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="flex flex-col bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-6 py-2 border-b border border-[#E1E6ED] shrink-0">
        <div className="flex items-center flex-wrap gap-2 justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-gray-900">{title}</h1>
            {onRefresh && (
              <button
                type="button"
                onClick={onRefresh}
                disabled={isRefreshing}
                className="text-primary hover:opacity-70 transition-opacity disabled:opacity-50"
                aria-label="Refresh"
              >
                <RefreshCw
                  className={`size-4 cursor-pointer  ${isRefreshing ? 'animate-spin ' : ''}`}
                />
              </button>
            )}
          </div>
          {headerAction}
        </div>
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
      </div>

      {isLoading || isRefreshing ? (
        <TableSkeleton rows={5} columns={columns.length} />
      ) : (
        <div className="flex flex-col">
          <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400 pointer-events-none" />
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full h-9 pl-9 pr-3 text-sm bg-[#F3F5F6] border border-gray-200 rounded-[2px] focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
              />
            </div>

            <button
              type="button"
              onClick={onFilterClick}
              className="flex items-center cursor-pointer gap-2 h-9 px-4 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg bg-white hover:bg-gray-50 transition-colors"
            >
              <SlidersHorizontal className="size-4" />
              Filters
              {filterCount > 0 && (
                <span className="flex items-center justify-center size-5 rounded-full bg-primary text-white text-xs font-semibold">
                  {filterCount}
                </span>
              )}
              <ChevronDown className="size-4" />
            </button>
          </div>

          <DataTable
            columns={columns}
            data={data}
            emptyDataMessage={emptyDataMessage}
            className="border-0 rounded-none [&_td]:py-2 [&_th]:h-9"
          />

          <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-2 border-t border-1 border-[#E1E6ED] text-sm text-[#1F2126] shrink-0">
            <span>{totalCount.toLocaleString()} results found</span>

            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="whitespace-nowrap">Rows per page:</span>
                <select
                  value={pageSize}
                  onChange={(e) => {
                    onPageSizeChange(Number(e.target.value));
                    onPageChange(1);
                  }}
                  className="h-8 px-2 text-sm  rounded bg-white focus:outline-none cursor-pointer"
                >
                  {PAGE_SIZE_OPTIONS.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="whitespace-nowrap">
                  {from}-{to} of {totalCount.toLocaleString()}
                </span>
                <button
                  type="button"
                  onClick={() => onPageChange(page - 1)}
                  disabled={page <= 1}
                  className="size-7 flex items-center text-black justify-center rounded  transition-colors"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onPageChange(page + 1)}
                  disabled={page >= totalPages}
                  className="size-7 flex items-center text-black justify-center rounded  transition-colors"
                  aria-label="Next page"
                >
                  <ChevronRight className="size-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DataTable;

