"use client";

import { useEffect, useState } from "react";
import { StatCard } from "@/components/stat-card";

export default function UserInsightsPage() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    setTodos(JSON.parse(localStorage.getItem("todo_tasks") || "[]"));
  }, []);

  const completed = todos.filter((todo) => todo.status === "COMPLETED").length;
  const high = todos.filter((todo) => todo.priority === "HIGH").length;

  return (
    <div className="animate-rise space-y-6">
      <section className="grid gap-4 md:grid-cols-3">
        <StatCard label="Open work" value={todos.length - completed} detail="Todos still moving" accent="bg-coral" />
        <StatCard label="Completed" value={completed} detail="Closed with focus" accent="bg-mint" />
        <StatCard label="High priority" value={high} detail="Needs attention" accent="bg-amberline" />
      </section>
      <div className="surface card-hover p-5">
        <p className="text-sm font-black uppercase tracking-wide text-orchid">Smart suggestion</p>
        <h2 className="mt-1 text-xl font-black text-ink dark:text-white">Priority pulse</h2>
        <p className="mt-3 max-w-2xl text-sm text-slate-500 dark:text-slate-300">
          Keep high-priority todos below three items for a cleaner day. This panel is ready for future AI summaries, calendar signals, and workload scoring.
        </p>
      </div>
    </div>
  );
}
