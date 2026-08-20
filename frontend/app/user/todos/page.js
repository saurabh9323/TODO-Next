"use client";

import { useMemo, useState } from "react";
import { CalendarDays, Check, Circle, Flame, Layers3, Plus, Search, Sparkles, Target } from "lucide-react";
import { createTask } from "@/lib/api";
import { getSession } from "@/lib/auth";

const initialTodos = [
  {
    id: "t-1",
    title: "Prepare weekly status",
    description: "Summarize blockers, shipped work, and next priorities.",
    priority: "HIGH",
    status: "TODO",
    due: "Today"
  },
  {
    id: "t-2",
    title: "Review onboarding checklist",
    description: "Make sure the new user setup flow is complete.",
    priority: "MEDIUM",
    status: "IN_PROGRESS",
    due: "Tomorrow"
  },
  {
    id: "t-3",
    title: "Clean completed tasks",
    description: "Archive old todos from the board.",
    priority: "LOW",
    status: "COMPLETED",
    due: "Friday"
  }
];

const columns = [
  { key: "TODO", label: "Todo" },
  { key: "IN_PROGRESS", label: "In progress" },
  { key: "COMPLETED", label: "Completed" }
];

export default function TodosPage() {
  const [todos, setTodos] = useState(() => {
    if (typeof window === "undefined") return initialTodos;
    const stored = localStorage.getItem("todo_tasks");
    if (stored) return JSON.parse(stored);
    localStorage.setItem("todo_tasks", JSON.stringify(initialTodos));
    return initialTodos;
  });
  const [query, setQuery] = useState("");
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "MEDIUM",
    due: "Today"
  });

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => `${todo.title} ${todo.description}`.toLowerCase().includes(query.toLowerCase()));
  }, [query, todos]);

  function persist(nextTodos) {
    setTodos(nextTodos);
    localStorage.setItem("todo_tasks", JSON.stringify(nextTodos));
  }

  async function addTodo(event) {
    event.preventDefault();
    const session = getSession();
    const task = {
      ...form,
      id: `t-${Date.now()}`,
      status: "TODO",
      userId: session?.email || null,
      categoryId: null
    };
    const saved = await createTask(task);
    persist([saved || task, ...todos]);
    setForm({ title: "", description: "", priority: "MEDIUM", due: "Today" });
  }

  function moveTodo(id, status) {
    persist(todos.map((todo) => (todo.id === id ? { ...todo, status } : todo)));
  }

  const completion = todos.length ? Math.round((todos.filter((todo) => todo.status === "COMPLETED").length / todos.length) * 100) : 0;

  return (
    <div className="animate-rise space-y-6">
      <section className="surface overflow-hidden p-5">
        <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <p className="inline-flex items-center gap-2 rounded-md bg-orchid/10 px-3 py-2 text-xs font-black uppercase tracking-wide text-orchid">
              <Target size={15} />
              Personal execution board
            </p>
            <h2 className="mt-4 text-4xl font-black text-ink dark:text-white">Move the right tasks forward.</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-300">
              Capture work, prioritize it, and keep the board clean with a fast cockpit built for daily use.
            </p>
          </div>
          <div className="rounded-md bg-gradient-to-br from-plum to-orchid p-5 text-white shadow-glow">
            <div className="flex items-center justify-between">
              <span className="grid h-12 w-12 place-items-center rounded-md bg-white/20">
                <Layers3 size={22} />
              </span>
              <span className="rounded-md bg-white/20 px-3 py-1 text-sm font-black">{completion}% complete</span>
            </div>
            <div className="mt-6 h-3 overflow-hidden rounded-full bg-white/20">
              <div className="h-full rounded-full bg-amberline transition-all duration-700" style={{ width: `${completion}%` }} />
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[0.75fr_1.25fr]">
        <form onSubmit={addTodo} className="surface card-hover p-5">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-md bg-coral/20 text-coral">
              <Plus size={20} />
            </span>
            <div>
              <p className="text-sm font-black uppercase tracking-wide text-orchid">Quick capture</p>
              <h2 className="text-xl font-black text-ink dark:text-white">Add todo</h2>
            </div>
          </div>
          <div className="mt-5 space-y-3">
            <input
              value={form.title}
              onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
              className="field"
              placeholder="Todo title"
              required
            />
            <textarea
              value={form.description}
              onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
              className="field min-h-24 resize-none"
              placeholder="Description"
            />
            <div className="grid gap-3 sm:grid-cols-2">
              <select
                value={form.priority}
                onChange={(event) => setForm((current) => ({ ...current, priority: event.target.value }))}
                className="field"
              >
                <option value="LOW">Low priority</option>
                <option value="MEDIUM">Medium priority</option>
                <option value="HIGH">High priority</option>
              </select>
              <input
                value={form.due}
                onChange={(event) => setForm((current) => ({ ...current, due: event.target.value }))}
                className="field"
                placeholder="Due"
              />
            </div>
            <button className="primary-button w-full py-3">
              <Plus size={17} />
              Add todo
            </button>
          </div>
        </form>

        <div className="surface card-hover p-5">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-wide text-orchid">Today</p>
              <h2 className="text-xl font-black text-ink dark:text-white">Focus meter</h2>
            </div>
            <div className="flex items-center gap-2 rounded-md bg-orchid/10 px-3 py-2 dark:bg-black/20">
              <Sparkles size={17} className="text-amberline" />
              <span className="text-sm font-bold text-plum dark:text-slate-200">{completion}% complete</span>
            </div>
          </div>
          <div className="mt-6 h-4 rounded-full bg-plum/10 dark:bg-black/20">
            <div className="h-4 rounded-full bg-gradient-to-r from-plum via-orchid to-coral transition-all duration-700" style={{ width: `${completion}%` }} />
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {columns.map((column) => (
              <div key={column.key} className="rounded-md bg-blush p-4 dark:bg-black/20">
                <p className="text-sm font-bold text-slate-500 dark:text-slate-300">{column.label}</p>
                <p className="mt-2 text-3xl font-black text-ink dark:text-white">{todos.filter((todo) => todo.status === column.key).length}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <label className="surface flex items-center gap-3 px-3 py-3">
        <Search size={18} className="text-orchid" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="w-full bg-transparent text-sm text-ink outline-none dark:text-white"
          placeholder="Search todos"
        />
      </label>

      <section className="grid gap-4 xl:grid-cols-3">
        {columns.map((column) => (
          <div key={column.key} className="surface min-h-80 p-3">
            <div className="mb-3 flex items-center justify-between px-1">
              <h3 className="font-black text-ink dark:text-white">{column.label}</h3>
              <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-black text-slate-500 dark:bg-black/20 dark:text-slate-300">
                {filteredTodos.filter((todo) => todo.status === column.key).length}
              </span>
            </div>
            <div className="space-y-3">
              {filteredTodos
                .filter((todo) => todo.status === column.key)
                .map((todo) => (
                  <article key={todo.id} className="card-hover rounded-md border border-plum/10 bg-white p-4 dark:border-white/10 dark:bg-black/20">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h4 className="font-black text-ink dark:text-white">{todo.title}</h4>
                        <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">{todo.description}</p>
                      </div>
                      <span className={`shrink-0 rounded-md px-2 py-1 text-xs font-black ${todo.priority === "HIGH" ? "bg-coral/20 text-coral" : todo.priority === "MEDIUM" ? "bg-amberline/20 text-yellow-700 dark:text-amberline" : "bg-mint/10 text-mint"}`}>
                        {todo.priority}
                      </span>
                    </div>
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-300">
                        {todo.priority === "HIGH" ? <Flame size={14} /> : <CalendarDays size={14} />}
                        {todo.due || "No due date"}
                      </span>
                      <div className="flex gap-1">
                        {columns.map((target) => (
                          <button
                            key={target.key}
                            type="button"
                            onClick={() => moveTodo(todo.id, target.key)}
                            className={`focus-ring inline-flex h-8 w-8 items-center justify-center rounded-md border transition ${
                              todo.status === target.key
                                ? "border-orchid bg-orchid text-white"
                                : "border-plum/10 text-slate-500 hover:-translate-y-0.5 hover:border-orchid dark:border-white/10 dark:text-slate-200"
                            }`}
                            title={`Move to ${target.label}`}
                            aria-label={`Move to ${target.label}`}
                          >
                            {target.key === "COMPLETED" ? <Check size={15} /> : <Circle size={15} />}
                          </button>
                        ))}
                      </div>
                    </div>
                  </article>
                ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
