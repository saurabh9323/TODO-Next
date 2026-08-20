import { Activity, TrendingUp } from "lucide-react";

export function MiniBarChart({ data }) {
  const max = Math.max(...data.map((item) => item.value), 1);

  return (
    <div className="flex h-44 items-end gap-3 rounded-md bg-gradient-to-b from-blush to-white p-4 dark:from-white/10 dark:to-black/10">
      {data.map((item, index) => (
        <div key={item.label} className="flex flex-1 flex-col items-center gap-2">
          <div className="flex h-32 w-full items-end overflow-hidden rounded-md bg-white/80 shadow-line dark:bg-white/10">
            <div
              className="w-full rounded-md bg-gradient-to-t from-plum via-orchid to-coral transition-all duration-700 ease-out"
              style={{
                height: `${Math.max((item.value / max) * 100, 10)}%`,
                transitionDelay: `${index * 70}ms`
              }}
            />
          </div>
          <span className="text-xs font-bold text-slate-500 dark:text-slate-300">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

export function DonutScore({ value, label }) {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="flex items-center gap-5">
      <div className="relative h-32 w-32">
        <svg className="h-32 w-32 -rotate-90" viewBox="0 0 120 120" aria-hidden="true">
          <circle cx="60" cy="60" r={radius} stroke="currentColor" strokeWidth="12" fill="none" className="text-plum/10 dark:text-white/10" />
          <circle
            cx="60"
            cy="60"
            r={radius}
            stroke="url(#donutGradient)"
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-700"
          />
          <defs>
            <linearGradient id="donutGradient" x1="0" x2="1" y1="0" y2="1">
              <stop stopColor="#56204F" />
              <stop offset="0.55" stopColor="#A44A9D" />
              <stop offset="1" stopColor="#F97367" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 grid place-items-center">
          <span className="text-2xl font-black text-plum dark:text-white">{value}%</span>
        </div>
      </div>
      <div>
        <p className="text-xs font-black uppercase tracking-wide text-orchid">Live index</p>
        <h3 className="mt-1 text-xl font-black text-ink dark:text-white">{label}</h3>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">Blends active users, completed todos, MFA readiness, and admin coverage.</p>
      </div>
    </div>
  );
}

export function PulsePanel({ rows }) {
  return (
    <div className="surface card-hover p-5">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-md bg-orchid/10 text-orchid">
          <Activity size={19} />
        </span>
        <div>
          <p className="text-xs font-black uppercase tracking-wide text-orchid">Operational pulse</p>
          <h2 className="text-lg font-black text-ink dark:text-white">Task disposition</h2>
        </div>
      </div>
      <div className="mt-5 space-y-4">
        {rows.map((row) => (
          <div key={row.label}>
            <div className="mb-2 flex justify-between text-sm font-bold text-slate-700 dark:text-slate-200">
              <span>{row.label}</span>
              <span>{row.value}</span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-plum/10 dark:bg-white/10">
              <div className={row.color} style={{ width: `${row.percent}%` }} />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 flex items-center gap-2 rounded-md bg-mint/10 px-3 py-2 text-sm font-bold text-mint">
        <TrendingUp size={16} />
        Velocity is trending upward this week
      </div>
    </div>
  );
}
