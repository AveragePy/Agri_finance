"use client";

import { SectionList } from "./SectionList";
import { type LucideIcon } from "lucide-react";

type SectionItem = string | { title: string; points?: string[]; content?: string; icon?: LucideIcon; badge?: string; badgeColorVar?: `--${string}` };

export type ModuleMeta = {
  title: string;
  description?: string;
  colorVar: `--${string}`;
  sections: SectionItem[];
  Icon?: LucideIcon;
};

export default function ModulePage({ meta }: { meta: ModuleMeta }) {
  const { title, description, sections, colorVar } = meta;
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: `var(${colorVar})` }} />
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      </div>
      {description && (
        <p className="text-muted-foreground max-w-2xl">{description}</p>
      )}
      <SectionList sections={sections} />
    </div>
  );
}
