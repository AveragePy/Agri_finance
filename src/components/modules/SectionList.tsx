"use client";

import { useState } from "react";
import type { LucideIcon } from "lucide-react";

type SectionItem =
  | string
  | {
      title: string;
      points?: string[];
      content?: string;
      icon?: LucideIcon;
      badge?: string;
      badgeColorVar?: `--${string}`;
    };

export function SectionList({ sections }: { sections: SectionItem[] }) {
  const [open, setOpen] = useState<number | null>(null);

  const renderTitle = (s: SectionItem) => (typeof s === "string" ? s : s.title);
  const renderIcon = (s: SectionItem) => {
    if (typeof s === "string" || !s.icon) return <div className="h-2.5 w-2.5 rounded-full mt-0.5 bg-foreground/40" />;
    const Icon = s.icon;
    return <Icon className="h-4 w-4 text-foreground/70" />;
  };
  const renderBadge = (s: SectionItem) => {
    if (typeof s === "string" || !s.badge) return null;
    return (
      <span
        className="ml-2 inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] leading-none text-muted-foreground"
        style={"badgeColorVar" in s && s.badgeColorVar ? { borderColor: `var(${s.badgeColorVar})`, color: `var(${s.badgeColorVar})` } : undefined}
      >
        {s.badge}
      </span>
    );
  };
  const renderBody = (s: SectionItem) => {
    if (typeof s === "string") return null;
    if (s.points && s.points.length) {
      return (
        <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
          {s.points.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      );
    }
    if (s.content) return <p className="text-sm text-muted-foreground">{s.content}</p>;
    return null;
  };

  return (
    <div className="space-y-2">
      {sections.map((s, idx) => {
        const isOpen = open === idx;
        return (
          <div key={renderTitle(s)} className="rounded-md border">
            <button
              className="w-full flex items-center gap-3 p-3 text-left"
              onClick={() => setOpen(isOpen ? null : idx)}
              aria-expanded={isOpen}
              aria-controls={`sect-${idx}`}
            >
              <div className={`transition-colors ${isOpen ? "text-foreground" : "text-foreground/60"}`}>{renderIcon(s)}</div>
              <div className="text-sm font-medium flex-1 flex items-center">
                {renderTitle(s)}
                {renderBadge(s)}
              </div>
              <span className={`text-xs text-muted-foreground transition-transform ${isOpen ? "rotate-90" : ""}`}>›</span>
            </button>
            <div
              id={`sect-${idx}`}
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
            >
              <div className="overflow-hidden px-3 pb-3">{renderBody(s)}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
