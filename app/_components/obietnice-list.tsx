"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import type { Obietnica, ObietnicaStatus } from "@/lib/definitions";
import { cn } from "@/lib/utils";
import { EmptyObietniceState } from "./empty-obietnice-state";
import { ObietnicaCard } from "./obietnica-card";

type ObietniceListProps = {
  obietnice: Obietnica[];
};

const statusOptions: Array<{
  value: ObietnicaStatus;
  label: string;
  indicatorClassName: string;
  dotClassName: string;
}> = [
  {
    value: "promised",
    label: "Obiecana",
    indicatorClassName: "bg-muted",
    dotClassName: "bg-muted-foreground/70",
  },
  {
    value: "fulfilled",
    label: "Spełniona",
    indicatorClassName: "bg-green-100 dark:bg-green-950/60",
    dotClassName: "bg-green-600 dark:bg-green-400",
  },
  {
    value: "unfulfilled",
    label: "Niespełniona",
    indicatorClassName: "bg-red-100 dark:bg-red-950/60",
    dotClassName: "bg-red-600 dark:bg-red-400",
  },
  {
    value: "partially_fulfilled",
    label: "Częściowo spełniona",
    indicatorClassName: "bg-amber-100 dark:bg-amber-950/60",
    dotClassName: "bg-amber-600 dark:bg-amber-400",
  },
];

export function ObietniceList({ obietnice }: ObietniceListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatuses, setSelectedStatuses] = useState<ObietnicaStatus[]>(
    [],
  );

  const filteredObietnice = useMemo(() => {
    const queryParts = normalizeSearchValue(searchQuery)
      .split(/\s+/)
      .filter(Boolean);

    if (queryParts.length === 0 && selectedStatuses.length === 0) {
      return obietnice;
    }

    return obietnice.filter((obietnica) => {
      if (
        selectedStatuses.length > 0 &&
        !selectedStatuses.includes(obietnica.status)
      ) {
        return false;
      }

      const searchableValues = [
        normalizeSearchValue(obietnica.title),
        ...obietnica.tags.map(normalizeSearchValue),
      ];

      return queryParts.every((queryPart) =>
        searchableValues.some((value) => value.includes(queryPart)),
      );
    });
  }, [obietnice, searchQuery, selectedStatuses]);

  if (obietnice.length === 0) {
    return <EmptyObietniceState />;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Szukaj po tytule lub tagu"
            className="h-10 pl-9"
          />
        </div>
        <Select
          multiple
          value={selectedStatuses}
          onValueChange={(value) =>
            setSelectedStatuses(value as ObietnicaStatus[])
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
      </div>

      <div className="grid gap-4">
        {filteredObietnice.length > 0 ? (
          filteredObietnice.map((obietnica) => (
            <ObietnicaCard key={obietnica.id} obietnica={obietnica} />
          ))
        ) : (
          <p className="rounded-lg border border-dashed border-border px-4 py-6 text-center text-sm text-muted-foreground">
            Brak obietnic pasujących do wyszukiwania.
          </p>
        )}
      </div>
    </div>
  );
}

function normalizeSearchValue(value: string) {
  return value.trim().toLocaleLowerCase("pl-PL");
}

function getStatusFilterLabel(selectedStatuses: ObietnicaStatus[]) {
  if (selectedStatuses.length === 0) {
    return "Wszystkie statusy";
  }

  if (selectedStatuses.length === 1) {
    return (
      statusOptions.find((status) => status.value === selectedStatuses[0])
        ?.label ?? "Wybrany status"
    );
  }

  return `Statusy: ${selectedStatuses.length}`;
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
