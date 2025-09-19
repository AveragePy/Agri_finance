import Link from "next/link";
import { modules } from "@/lib/mock";

export default function ModulesGrid() {
  return (
    <section className="mt-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {modules.map((m) => (
          <Link key={m.href} href={m.href} className="rounded-xl border p-4 bg-card hover:shadow transition-shadow">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: m.color }} />
              <h3 className="font-medium">{m.title}</h3>
            </div>
            <ul className="text-xs text-muted-foreground list-disc pl-5 space-y-1">
              {m.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </Link>
        ))}
      </div>
    </section>
  );
}
