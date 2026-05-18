"use client";

import { ArrowDownUp, Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import type { ObietnicaStatus } from "@/lib/definitions";
import { cn } from "@/lib/utils";
import {
  getSortOptionLabel,
  getStatusFilterLabel,
  sortOptions,
  statusOptions,
  type SortOption,
} from "./obietnice-list-filters";

type ObietniceListControlsProps = {
  searchQuery: string;
  selectedStatuses: ObietnicaStatus[];
  sortOption: SortOption;
  onSearchQueryChange: (searchQuery: string) => void;
  onSelectedStatusesChange: (selectedStatuses: ObietnicaStatus[]) => void;
  onSortOptionChange: (sortOption: SortOption) => void;
};

export function ObietniceListControls({
  searchQuery,
  selectedStatuses,
  sortOption,
  onSearchQueryChange,
  onSelectedStatusesChange,
  onSortOptionChange,
}: ObietniceListControlsProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <div className="relative flex-1">
        <Search
          aria-hidden="true"
          className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          type="search"
          value={searchQuery}
          onChange={(event) => onSearchQueryChange(event.target.value)}
          placeholder="Szukaj po tytule lub tagu"
          className="h-10 pl-9"
        />
      </div>

      <Select
        multiple
        value={selectedStatuses}
        onValueChange={(value) =>
          onSelectedStatusesChange(value as ObietnicaStatus[])
        }
      >
        <SelectTrigger
          aria-label="Filtruj po statusach"
          className="h-10 font-normal sm:w-56"
        >
          <StatusFilterLabel selectedStatuses={selectedStatuses} />
        </SelectTrigger>
        <SelectContent>
          {statusOptions.map((status) => (
            <SelectItem key={status.value} value={status.value}>
              <StatusIndicator
                indicatorClassName={status.indicatorClassName}
                dotClassName={status.dotClassName}
              />
              <span className="truncate">{status.label}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={sortOption}
        onValueChange={(value) => onSortOptionChange(value as SortOption)}
      >
        <SelectTrigger
          aria-label="Sortuj obietnice"
          className="h-10 font-normal sm:w-48"
        >
          <SortLabel sortOption={sortOption} />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

function StatusFilterLabel({
  selectedStatuses,
}: {
  selectedStatuses: ObietnicaStatus[];
}) {
  const selectedStatus =
    selectedStatuses.length === 1
      ? statusOptions.find((status) => status.value === selectedStatuses[0])
      : undefined;

  return (
    <span className="flex min-w-0 items-center gap-2.5">
      {selectedStatus ? (
        <StatusIndicator
          indicatorClassName={selectedStatus.indicatorClassName}
          dotClassName={selectedStatus.dotClassName}
        />
      ) : null}
      <span className="truncate text-foreground">
        {getStatusFilterLabel(selectedStatuses)}
      </span>
    </span>
  );
}

function SortLabel({ sortOption }: { sortOption: SortOption }) {
  return (
    <span className="flex min-w-0 items-center gap-2.5">
      <ArrowDownUp
        aria-hidden="true"
        className="size-4 shrink-0 text-muted-foreground"
      />
      <span className="truncate text-foreground">
        {getSortOptionLabel(sortOption) ?? "Sortuj"}
      </span>
    </span>
  );
}

function StatusIndicator({
  indicatorClassName,
  dotClassName,
}: {
  indicatorClassName: string;
  dotClassName: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex size-5 shrink-0 items-center justify-center rounded-md",
        indicatorClassName,
      )}
    >
      <span className={cn("size-1.5 rounded-full", dotClassName)} />
    </span>
  );
}
