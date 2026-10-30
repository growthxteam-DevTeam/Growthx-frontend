"use client";

import { ChevronsUpDown } from "lucide-react";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface OptionSelectProps<T extends string> {
  value: T;
  options: readonly T[];
  onChange: (value: T) => void;
  labelFor: (value: T) => string;
  ariaLabel: string;
}

const OptionSelect = <T extends string>({ value, options, onChange, labelFor, ariaLabel }: OptionSelectProps<T>) => (
  <Select value={value} onValueChange={(next) => next && onChange(next as T)}>
    <SelectTrigger
      aria-label={ariaLabel}
      className="h-8 w-32 justify-between rounded-md border-border px-2.5 text-[13px] text-ink [&>svg:last-child]:hidden"
    >
      <SelectValue>{labelFor(value)}</SelectValue>
      <ChevronsUpDown className="size-3.5 text-ink-muted" />
    </SelectTrigger>
    <SelectContent alignItemWithTrigger={false} align="end">
      {options.map((option) => (
        <SelectItem key={option} value={option}>
          {labelFor(option)}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);

export default OptionSelect;
