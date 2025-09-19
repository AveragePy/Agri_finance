import { metrics } from "@/lib/mock";

export default function ValueBar() {
  return (
    <section className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-2 rounded-xl border bg-card/70 backdrop-blur p-3">
      {metrics.map((it) => (
        <div key={it.label} className="rounded-lg border p-3">
          <div className="text-sm font-medium">{it.label}</div>
          <div className="text-base md:text-lg font-semibold">{it.value}</div>
          {it.note ? (
            <div className="text-xs text-muted-foreground">{it.note}</div>
          ) : null}
        </div>
      ))}
    </section>
  );
}
