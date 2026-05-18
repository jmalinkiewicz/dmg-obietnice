"use client";

import { useMemo, useState } from "react";

import type { Obietnica, ObietnicaStatus } from "@/lib/definitions";
import { EmptyObietniceState } from "./empty-obietnice-state";
import { ObietnicaCard } from "./obietnica-card";
import { ObietniceListControls } from "./obietnice-list-controls";
import {
  getFilteredAndSortedObietnice,
  type SortOption,
} from "./obietnice-list-filters";

type ObietniceListProps = {
  obietnice: Obietnica[];
};

export function ObietniceList({ obietnice }: ObietniceListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatuses, setSelectedStatuses] = useState<ObietnicaStatus[]>(
    [],
  );
  const [sortOption, setSortOption] = useState<SortOption>("newest");

  const filteredObietnice = useMemo(() => {
    return getFilteredAndSortedObietnice({
      obietnice,
      searchQuery,
      selectedStatuses,
      sortOption,
    });
  }, [obietnice, searchQuery, selectedStatuses, sortOption]);

  if (obietnice.length === 0) {
    return <EmptyObietniceState />;
  }

  return (
    <div className="flex flex-col gap-4">
      <ObietniceListControls
        searchQuery={searchQuery}
        selectedStatuses={selectedStatuses}
        sortOption={sortOption}
        onSearchQueryChange={setSearchQuery}
        onSelectedStatusesChange={setSelectedStatuses}
        onSortOptionChange={setSortOption}
      />

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
