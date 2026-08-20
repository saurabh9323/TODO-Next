import { ArrowUpRight } from "lucide-react";

export function StatCard({ label, value, accent = "bg-orchid", detail, icon: Icon }) {
  return (
    <div className="surface card-hover animate-rise group relative overflow-hidden p-5">
      <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-gradient-to-br from-orchid/20 to-coral/10 transition duration-300 group-hover:scale-110" />
      <div className="relative flex items-start justify-between gap-3">
        <div>
          <p className="max-w-36 text-sm font-black uppercase leading-tight tracking-wide text-slate-600 dark:text-slate-200">{label}</p>
          <p className="mt-3 text-4xl font-black text-ink dark:text-white">{value}</p>
        </div>
        <span className={`grid h-12 w-12 place-items-center rounded-md ${accent} text-white shadow-sm`}>
          {Icon ? <Icon size={21} /> : <ArrowUpRight size={21} />}
        </span>
      </div>
      <div className="relative mt-5 flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-slate-500 dark:text-slate-300">{detail}</p>
        <ArrowUpRight size={16} className="text-slate-400 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-orchid" />
      </div>
    </div>
  );
}
