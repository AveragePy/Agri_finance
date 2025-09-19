"use client";
import Link from "next/link";
import ValueBar from "@/components/home/ValueBar";
import ModulesGrid from "@/components/home/ModulesGrid";
import ScrollReveal from "@/components/common/ScrollReveal";
import { sections } from "@/lib/mock";

export default function Home() {
  return (
    <div className="space-y-0">
      {/* Full-screen, full-bleed hero */}
      <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen">
        <section
          className="relative overflow-hidden min-h-[100dvh] mt-[-56px] pt-14 grid place-items-center"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, color-mix(in oklch, var(--primary) 35%, transparent), color-mix(in oklch, var(--primary) 65%, transparent)), url(/dashboard-bg.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="relative z-10 px-6 md:px-12 text-white text-center max-w-3xl">
            <h1 className="mt-4 text-4xl md:text-6xl font-semibold leading-tight drop-shadow">
              Market Invoice Agri Input Finance System
            </h1>
            <p className="mt-4 mx-auto max-w-2xl text-base md:text-lg text-white/90">
              Empowering farmer ecosystems with integrated advisory, identity, credit and distribution — all connected in one green, data‑driven platform.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                onClick={() => document.getElementById('modules-grid')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center rounded-full border bg-white/10 text-white px-4 py-2 text-sm backdrop-blur hover:bg-white/20"
              >
                Explore modules
              </button>
              <Link href="/about" className="inline-flex items-center rounded-full border bg-white/10 text-white px-4 py-2 text-sm backdrop-blur hover:bg-white/20">Contact</Link>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/0 to-black/40" />
        </section>
      </div>

      {/* Value/metrics bar */}
      <ValueBar />

      {/* Large scroll-down detailed sections generated from mock data */}
      <section className="mt-16 space-y-20">
        {sections.map((s, idx) => {
          const imageFirst = idx % 2 === 1; // alternate
          return (
            <ScrollReveal key={s.key} delay={idx * 100}>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                {imageFirst ? (
                  <div
                    className="h-72 md:h-96 rounded-2xl border bg-cover bg-center shadow-sm"
                    style={{ backgroundImage: `url(${s.image})` }}
                  />
                ) : (
                  <div className="order-2 md:order-1">
                    <h3 className="text-3xl font-semibold">{s.title}</h3>
                    <ul className="mt-4 text-base text-muted-foreground list-disc pl-6 space-y-2">
                      {s.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {imageFirst ? (
                  <div className="md:order-2">
                    <h3 className="text-3xl font-semibold">{s.title}</h3>
                    <ul className="mt-4 text-base text-muted-foreground list-disc pl-6 space-y-2">
                      {s.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div
                    className="order-1 md:order-2 h-72 md:h-96 rounded-2xl border bg-cover bg-center shadow-sm"
                    style={{ backgroundImage: `url(${s.image})` }}
                  />
                )}
              </div>
            </ScrollReveal>
          );
        })}
      </section>

      {/* CTA band */}
      <section className="mt-16">
        <div className="rounded-2xl border p-6 md:p-8 bg-card/70 backdrop-blur flex flex-col md:flex-row items-center gap-4 md:gap-6 justify-between">
          <div>
            <h4 className="text-xl font-semibold">Partner with us to power farmer ecosystems</h4>
            <p className="text-sm text-muted-foreground">See how each module connects to deliver inputs, finance, and last‑mile distribution.</p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/about" className="inline-flex items-center rounded-full border px-4 py-2 text-sm hover:bg-muted">Contact</Link>
            <button
              onClick={() => document.getElementById('modules-grid')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center rounded-full border px-4 py-2 text-sm hover:bg-muted"
            >Explore modules</button>
          </div>
        </div>
      </section>

      {/* Modules grid */}
      <div id="modules-grid">
        <ModulesGrid />
      </div>
    </div>
  );
}
