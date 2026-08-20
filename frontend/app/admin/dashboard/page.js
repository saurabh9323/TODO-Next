"use client";

import { Building2, CheckCircle2, CreditCard, RefreshCw, ShieldCheck, Sparkles, Users, WalletCards } from "lucide-react";
import { useEffect, useState } from "react";
import { StatCard } from "@/components/stat-card";
import { fetchUsers } from "@/lib/api";
import { DonutScore, MiniBarChart, PulsePanel } from "@/components/chart-panel";

const portfolioRows = [
  { client: "Design Guild", policy: "Creative Plan", users: 96, lives: 118, balance: "$18,400", renewal: "42 days" },
  { client: "Northstar Labs", policy: "Growth Cover", users: 64, lives: 92, balance: "$12,800", renewal: "67 days" },
  { client: "Apex Studio", policy: "Starter Shield", users: 36, lives: 44, balance: "$7,250", renewal: "89 days" },
  { client: "Todo Ops", policy: "Internal", users: 12, lives: 16, balance: "$3,900", renewal: "112 days" }
];

const chartData = [
  { label: "Mon", value: 32 },
  { label: "Tue", value: 45 },
  { label: "Wed", value: 39 },
  { label: "Thu", value: 58 },
  { label: "Fri", value: 76 },
  { label: "Sat", value: 51 }
];

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers().then(setUsers);
  }, []);

  const activeUsers = users.filter((user) => user.status === "ACTIVE").length;
  const admins = users.filter((user) => user.role === "ADMIN").length;

  const score = users.length ? Math.min(99, 70 + activeUsers * 4 + admins * 3) : 86;

  return (
    <div className="animate-rise space-y-6">
      <section className="flex flex-col justify-between gap-4 xl:flex-row xl:items-end">
        <div>
          <div className="flex flex-wrap items-center gap-4 text-sm font-bold text-plum dark:text-slate-200">
            <span className="inline-flex items-center gap-2">
              <Sparkles size={16} className="text-orchid" />
              Organization-wide
            </span>
            <span>Thursday, 20 August</span>
          </div>
          <h2 className="mt-4 text-4xl font-black text-ink dark:text-white">Admin command center</h2>
          <p className="mt-2 max-w-3xl text-base text-slate-600 dark:text-slate-300">
            Monitor users, tasks, categories, and access readiness from one calm operational workspace.
          </p>
        </div>
        <button className="soft-button self-start xl:self-auto">
          <RefreshCw size={17} />
          Refresh data
        </button>
      </section>

      <section className="grid gap-4 md:grid-cols-2 2xl:grid-cols-6">
        <StatCard label="Total users" value={users.length} detail="View details" accent="bg-orchid" icon={Users} />
        <StatCard label="Active users" value={activeUsers} detail="Ready to assign todos" accent="bg-mint" icon={CheckCircle2} />
        <StatCard label="Admin seats" value={admins} detail="Elevated access" accent="bg-amberline" icon={ShieldCheck} />
        <StatCard label="Open tasks" value="24" detail="Across boards" accent="bg-coral" icon={WalletCards} />
        <StatCard label="Categories" value="8" detail="Master data ready" accent="bg-sky-500" icon={Building2} />
        <StatCard label="Pending MFA" value={Math.max(users.length - activeUsers, 0)} detail="Needs review" accent="bg-pink-500" icon={CreditCard} />
      </section>

      <section className="grid gap-4 lg:grid-cols-4">
        {[
          ["Active employees", 196, "Across visible workspace"],
          ["Covered todos", 218, "1.1 tasks per user"],
          ["Completion balance", "74%", "Current focus score"],
          ["Settlement rate", "97%", "Completed versus created"]
        ].map(([label, value, detail]) => (
          <div key={label} className="surface card-hover flex items-center gap-4 p-5">
            <span className="grid h-14 w-14 place-items-center rounded-md bg-slate-100 text-plum dark:bg-white/10 dark:text-white">
              <Users size={22} />
            </span>
            <div>
              <p className="text-sm font-black uppercase tracking-wide text-slate-600 dark:text-slate-300">{label}</p>
              <p className="mt-1 text-3xl font-black text-ink dark:text-white">{value}</p>
              <p className="text-sm text-slate-500 dark:text-slate-300">{detail}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.6fr_0.8fr]">
        <div className="surface overflow-hidden">
          <div className="flex flex-col justify-between gap-4 border-b border-plum/10 p-5 dark:border-white/10 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-orchid">Client and task portfolio</p>
              <h2 className="mt-1 text-xl font-black text-ink dark:text-white">Live operational records</h2>
            </div>
            <button className="soft-button">
              Renewal {"<="} 90 days
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-lilac text-xs uppercase tracking-wide text-plum dark:bg-white/10 dark:text-slate-200">
                <tr>
                  <th className="px-5 py-4">Client</th>
                  <th className="px-5 py-4">Policy</th>
                  <th className="px-5 py-4">Users</th>
                  <th className="px-5 py-4">Todos</th>
                  <th className="px-5 py-4">Balance</th>
                  <th className="px-5 py-4">Renewal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-plum/10 dark:divide-white/10">
                {portfolioRows.map((row) => (
                  <tr key={row.client} className="transition hover:bg-blush/80 dark:hover:bg-white/5">
                    <td className="px-5 py-4 font-black text-ink dark:text-white">{row.client}</td>
                    <td className="px-5 py-4 text-slate-600 dark:text-slate-300">{row.policy}</td>
                    <td className="px-5 py-4 font-bold">{row.users}</td>
                    <td className="px-5 py-4 font-bold">{row.lives}</td>
                    <td className="px-5 py-4 font-black">{row.balance}</td>
                    <td className="px-5 py-4">
                      <span className="rounded-md bg-orchid/10 px-2 py-1 text-xs font-black text-orchid">{row.renewal}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <PulsePanel
          rows={[
            { label: "Completed", value: 292, percent: 92, color: "h-full rounded-full bg-emerald-500 transition-all duration-700" },
            { label: "Pending", value: 18, percent: 34, color: "h-full rounded-full bg-amberline transition-all duration-700" },
            { label: "Blocked", value: 8, percent: 18, color: "h-full rounded-full bg-coral transition-all duration-700" }
          ]}
        />
      </section>

      <section className="grid gap-5 xl:grid-cols-[1fr_0.9fr]">
        <div className="surface card-hover p-5">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-orchid">Throughput</p>
              <h2 className="text-xl font-black text-ink dark:text-white">Weekly activity graph</h2>
            </div>
            <span className="rounded-md bg-mint/10 px-3 py-2 text-sm font-black text-mint">+18.4%</span>
          </div>
          <MiniBarChart data={chartData} />
        </div>

        <div className="surface card-hover p-5">
          <DonutScore value={score} label="Workspace health" />
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {["OTP", "OAuth", "MFA"].map((item, index) => (
              <div key={item} className="rounded-md bg-blush p-3 dark:bg-black/20">
                <p className="text-xs font-black uppercase tracking-wide text-slate-500 dark:text-slate-300">{item}</p>
                <p className="mt-1 text-lg font-black text-plum dark:text-white">{92 - index * 4}%</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
