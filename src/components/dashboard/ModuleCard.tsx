import Link from "next/link";
import { type LucideIcon } from "lucide-react";

export type ModuleCardProps = {
  title: string;
  href: string;
  colorVar: `--${string}`; // e.g., --mv-green
  Icon: LucideIcon;
  items?: string[];
};

export default function ModuleCard({ title, href, colorVar, Icon, items }: ModuleCardProps) {
  return (
    <Link
      href={href}
      className="mv-module-card block p-4 relative overflow-hidden"
      style={{ borderColor: `var(${colorVar})` }}
    >
      <div className="flex items-center gap-2 mb-2">
        <Icon className="h-5 w-5" style={{ color: `var(${colorVar})` }} />
        <h3 className="font-semibold">{title}</h3>
      </div>
      {items && (
        <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-5">
          {items.slice(0, 5).map((it) => (
            <li key={it}>{it}</li>
          ))}
        </ul>
      )}
    </Link>
  );
}
