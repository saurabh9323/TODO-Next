"use client";

import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, Monitor, Palette, RotateCcw, Save, Smartphone } from "lucide-react";
import { defaultBrand, getBrand, resetBrand, saveBrand } from "@/lib/branding";

const colorFields = [
  ["primary", "Primary"],
  ["sidebar", "Sidebar"],
  ["accent", "Accent"],
  ["background", "Background"],
  ["secondary", "Secondary"],
  ["surface", "Surface"],
  ["text", "Text"]
];

export default function BrandingPage() {
  const [brand, setBrand] = useState(defaultBrand);
  const [device, setDevice] = useState("desktop");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setBrand(getBrand());
  }, []);

  const progress = useMemo(() => {
    const required = [brand.name, brand.portalTitle, brand.primary, brand.sidebar, brand.accent, brand.background];
    return Math.round((required.filter(Boolean).length / required.length) * 100);
  }, [brand]);

  function updateField(field, value) {
    setBrand((current) => ({ ...current, [field]: value }));
    setSaved(false);
  }

  function applyChanges(event) {
    event.preventDefault();
    saveBrand(brand);
    setSaved(true);
  }

  function restoreDefault() {
    resetBrand();
    setBrand(defaultBrand);
    setSaved(true);
  }

  return (
    <div className="animate-rise space-y-6">
      <section className="surface overflow-hidden p-6">
        <div className="grid gap-6 xl:grid-cols-[1fr_auto] xl:items-end">
          <div>
            <p className="inline-flex items-center gap-2 rounded-md bg-orchid/10 px-3 py-2 text-xs font-black uppercase tracking-wide text-orchid">
              <Palette size={15} />
              Portal identity control centre
            </p>
            <h2 className="mt-4 text-4xl font-black text-ink dark:text-white">Branding master</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-300">
              Change the live portal colors, sidebar identity, browser title, and brand language from one master screen.
            </p>
          </div>
          <div className="rounded-md bg-lilac p-4 dark:bg-black/20">
            <div className="mb-2 flex justify-between text-xs font-black uppercase tracking-wide text-plum dark:text-white">
              <span>Setup complete</span>
              <span>{progress}%</span>
            </div>
            <div className="h-2 w-64 max-w-full overflow-hidden rounded-full bg-white dark:bg-white/10">
              <div className="h-full rounded-full bg-gradient-to-r from-plum to-orchid transition-all duration-700" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
        <form onSubmit={applyChanges} className="surface card-hover space-y-5 p-5">
          <div>
            <p className="text-xs font-black uppercase tracking-wide text-orchid">Identity</p>
            <h3 className="mt-1 text-2xl font-black text-ink dark:text-white">Live brand controls</h3>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ["name", "Brand name"],
              ["portalTitle", "Portal title"],
              ["tagline", "Tagline"]
            ].map(([field, label]) => (
              <label key={field} className={field === "tagline" ? "sm:col-span-2" : ""}>
                <span className="mb-2 block text-sm font-bold text-slate-600 dark:text-slate-200">{label}</span>
                <input value={brand[field]} onChange={(event) => updateField(field, event.target.value)} className="field" />
              </label>
            ))}
          </div>

          <div>
            <p className="mb-3 text-xs font-black uppercase tracking-wide text-orchid">Color system</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {colorFields.map(([field, label]) => (
                <label key={field} className="flex items-center gap-3 rounded-md border border-plum/10 bg-blush/70 p-3 dark:border-white/10 dark:bg-black/20">
                  <input
                    type="color"
                    value={brand[field]}
                    onChange={(event) => updateField(field, event.target.value)}
                    className="h-11 w-12 cursor-pointer rounded-md border-0 bg-transparent"
                  />
                  <span>
                    <span className="block text-sm font-black text-ink dark:text-white">{label}</span>
                    <span className="font-mono text-xs text-slate-500 dark:text-slate-300">{brand[field]}</span>
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap justify-between gap-3 border-t border-plum/10 pt-5 dark:border-white/10">
            <button type="button" onClick={restoreDefault} className="soft-button">
              <RotateCcw size={16} />
              Reset default
            </button>
            <button className="primary-button">
              {saved ? <CheckCircle2 size={16} /> : <Save size={16} />}
              {saved ? "Applied" : "Save branding"}
            </button>
          </div>
        </form>

        <div className="surface card-hover p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-orchid">Preview</p>
              <h3 className="text-2xl font-black text-ink dark:text-white">Portal look</h3>
            </div>
            <div className="flex rounded-md border border-plum/10 bg-lilac p-1 dark:border-white/10 dark:bg-black/20">
              <button type="button" onClick={() => setDevice("desktop")} className={`rounded-md p-2 ${device === "desktop" ? "bg-white text-plum shadow-sm dark:bg-white dark:text-plum" : "text-slate-500 dark:text-slate-300"}`} title="Desktop preview">
                <Monitor size={16} />
              </button>
              <button type="button" onClick={() => setDevice("mobile")} className={`rounded-md p-2 ${device === "mobile" ? "bg-white text-plum shadow-sm dark:bg-white dark:text-plum" : "text-slate-500 dark:text-slate-300"}`} title="Mobile preview">
                <Smartphone size={16} />
              </button>
            </div>
          </div>

          <div className={`mx-auto overflow-hidden rounded-md border-8 border-ink shadow-glow transition-all ${device === "mobile" ? "max-w-sm" : "w-full"}`}>
            <div className="flex h-[520px]" style={{ background: brand.background, color: brand.text }}>
              <aside className={`${device === "mobile" ? "w-16" : "w-56"} p-4`} style={{ background: brand.sidebar }}>
                <div className="rounded-md bg-white px-3 py-3 text-center text-sm font-black" style={{ color: brand.primary }}>
                  {device === "mobile" ? brand.name.slice(0, 1) : brand.name}
                </div>
                <div className="mt-8 space-y-2">
                  {["Dashboard", "User Master", "Category Master", "Branding"].map((item, index) => (
                    <div key={item} className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-bold text-white" style={{ background: index === 0 ? brand.primary : "transparent" }}>
                      <span className="h-2 w-2 rounded-full bg-white/70" />
                      {device !== "mobile" && item}
                    </div>
                  ))}
                </div>
              </aside>
              <main className="min-w-0 flex-1">
                <header className="flex h-16 items-center justify-between border-b border-black/10 px-5" style={{ background: brand.surface }}>
                  <div>
                    <p className="text-xs font-black uppercase tracking-wide" style={{ color: brand.primary }}>{brand.name}</p>
                    <p className="text-xs opacity-70">{brand.tagline}</p>
                  </div>
                  <span className="h-9 w-9 rounded-md" style={{ background: brand.accent }} />
                </header>
                <div className="p-5">
                  <h4 className="text-3xl font-black">Dashboard</h4>
                  <div className={`mt-5 grid gap-3 ${device === "mobile" ? "grid-cols-1" : "grid-cols-3"}`}>
                    {["Users", "Categories", "Tasks"].map((item, index) => (
                      <div key={item} className="rounded-md border border-black/10 p-4" style={{ background: brand.surface }}>
                        <span className="block h-10 w-10 rounded-md" style={{ background: index === 1 ? brand.accent : brand.primary }} />
                        <p className="mt-4 text-2xl font-black">{[46, 8, 124][index]}</p>
                        <p className="text-xs opacity-70">{item}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 rounded-md border border-black/10 p-4" style={{ background: brand.surface }}>
                    <div className="h-3 overflow-hidden rounded-full" style={{ background: brand.secondary }}>
                      <div className="h-full w-3/4 rounded-full" style={{ background: brand.primary }} />
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
