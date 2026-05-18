"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";

import { Input } from "@/components/ui/input";
import type { Obietnica } from "@/lib/definitions";
import { EmptyObietniceState } from "./empty-obietnice-state";
import { ObietnicaCard } from "./obietnica-card";

type ObietniceListProps = {
  obietnice: Obietnica[];
};

export function ObietniceList({ obietnice }: ObietniceListProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredObietnice = useMemo(() => {
    const queryParts = normalizeSearchValue(searchQuery)
      .split(/\s+/)
      .filter(Boolean);

    if (queryParts.length === 0) {
      return obietnice;
    }

    return obietnice.filter((obietnica) => {
      const searchableValues = [
        normalizeSearchValue(obietnica.title),
        ...obietnica.tags.map(normalizeSearchValue),
      ];

      return queryParts.every((queryPart) =>
        searchableValues.some((value) => value.includes(queryPart)),
      );
    });
  }, [obietnice, searchQuery]);

  if (obietnice.length === 0) {
    return <EmptyObietniceState />;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="relative">
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
