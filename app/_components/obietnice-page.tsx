import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Obietnica } from "@/lib/definitions";
import { ObietniceList } from "./obietnice-list";

type ObietnicePageProps = {
  obietnice: Obietnica[];
};

export function ObietnicePage({ obietnice }: ObietnicePageProps) {
  return (
    <main className="min-h-screen bg-background px-6 py-10 text-foreground sm:px-10 lg:px-16">
      <section className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        <ObietnicePageHeader />
        <ObietniceList obietnice={obietnice} />
      </section>
    </main>
  );
}

function ObietnicePageHeader() {
  return (
    <header className="flex flex-col gap-3">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Badge variant="outline" className="w-fit">
          DMG
        </Badge>
        <Link
          href="/zglos"
          className="inline-flex h-9 w-fit items-center justify-center gap-1.5 rounded-lg bg-primary px-2.5 text-sm font-medium whitespace-nowrap text-primary-foreground transition-all hover:bg-primary/80 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
        >
          <PlusCircle aria-hidden="true" className="size-4" />
          Zgłoś klip
        </Link>
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-semibold tracking-normal text-foreground sm:text-5xl">
          Lista obietnic
        </h1>
        <p className="max-w-2xl text-base leading-7 text-muted-foreground">
          Publiczny przegląd obietnic zapisanych w rejestrze scamu.
        </p>
      </div>
    </header>
  );
}
