"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BarChart3,
  Bell,
  Brush,
  CheckSquare,
  ChevronRight,
  Command,
  Database,
  LayoutDashboard,
  LogOut,
  Plus,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Users
} from "lucide-react";
import { clearSession, getSession } from "@/lib/auth";
import { ThemeToggle } from "@/components/theme-toggle";
import { useEffect, useState } from "react";

const adminNav = [
  { id: "admin-dashboard", href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "admin-users", href: "/admin/users", label: "User master", icon: Users },
  { id: "admin-categories", href: "/admin/categories", label: "Category master", icon: Database },
  { id: "admin-branding", href: "/admin/branding", label: "Branding master", icon: Brush },
  { id: "admin-add-user", href: "/admin/users/add", label: "Add user", icon: Plus },
  { id: "admin-automation", href: "/admin/dashboard", label: "Automation rules", icon: SlidersHorizontal }
];

const userNav = [
  { id: "user-todos", href: "/user/todos", label: "My todos", icon: CheckSquare },
  { id: "user-insights", href: "/user/insights", label: "Insights", icon: BarChart3 }
];

export function AppShell({ children, role = "USER" }) {
  const pathname = usePathname();
  const router = useRouter();
  const [session, setSession] = useState(null);
  const [brandName, setBrandName] = useState("Todo Command");
  const items = role === "ADMIN" ? adminNav : userNav;

  useEffect(() => {
    const nextSession = getSession();
    if (!nextSession) {
      router.replace("/login");
      return;
    }
    if (role === "ADMIN" && nextSession.role !== "ADMIN") router.replace("/user/todos");
    if (role === "USER" && nextSession.role === "ADMIN") router.replace("/admin/dashboard");
    setSession(nextSession);
  }, [role, router]);

  useEffect(() => {
    const updateBrandName = () => {
      const stored = JSON.parse(localStorage.getItem("todo_brand") || "null");
      setBrandName(stored?.name || "Todo Command");
    };
    updateBrandName();
    window.addEventListener("todo-brand-updated", updateBrandName);
    return () => window.removeEventListener("todo-brand-updated", updateBrandName);
  }, []);

  function logout() {
    clearSession();
    router.replace("/login");
  }

  return (
    <div className="min-h-screen bg-transparent">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-80 bg-plum text-white shadow-glow lg:flex lg:flex-col">
        <div className="p-5">
          <Link href="/" className="flex items-center gap-3 rounded-md bg-white px-4 py-3 text-plum shadow-sm">
          <span className="grid h-10 w-10 place-items-center rounded-md bg-plum text-white">
            <ShieldCheck size={21} />
          </span>
          <span>
            <span className="block text-sm font-black uppercase tracking-wide text-orchid">{brandName}</span>
            <span className="block text-lg font-black">{role === "ADMIN" ? "Admin" : "Workspace"}</span>
          </span>
          </Link>
        </div>

        <nav className="mt-3 flex-1 space-y-1 overflow-y-auto px-4 pb-5">
          <p className="mb-3 px-1 text-xs font-black uppercase tracking-widest text-white/70">{role === "ADMIN" ? "Master" : "Workspace"}</p>
          {items.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href || (item.href !== "/admin/dashboard" && pathname.startsWith(`${item.href}/`));
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`group flex items-center justify-between rounded-md px-4 py-3 text-sm font-bold transition duration-300 ${
                  active
                    ? "bg-white/20 text-white ring-1 ring-white/20"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                <span className="flex items-center gap-3">
                  <Icon size={18} className="transition group-hover:scale-110" />
                  {item.label}
                </span>
                {active && <ChevronRight size={16} className="animate-soft-pulse" />}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/10 p-5">
          <div className="rounded-md bg-white/10 p-4">
            <p className="text-xs text-white/70">Signed in as</p>
            <p className="mt-1 truncate text-sm font-black">{session?.email || "guest@todo.app"}</p>
            <p className="text-xs text-white/70">{session?.role || role}</p>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm font-bold text-white/80">
            <span className="h-2.5 w-2.5 rounded-full bg-amberline" />
            Todo Command {role === "ADMIN" ? "Admin" : "User"}
          </div>
        </div>
      </aside>

      <div className="lg:pl-80">
        <header className="sticky top-0 z-20 border-b border-plum/10 bg-blush/80 px-4 py-4 shadow-line backdrop-blur-xl dark:border-white/10 dark:bg-ink/75 sm:px-6">
          <div className="grid gap-4 xl:grid-cols-[1fr_auto_1fr] xl:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-orchid">{role === "ADMIN" ? "Organization-wide" : "Personal board"}</p>
              <h1 className="text-2xl font-black text-plum dark:text-white sm:text-3xl">
                {role === "ADMIN" ? "Dashboard" : "Todo cockpit"}
              </h1>
            </div>
            <label className="hidden h-12 w-[min(36vw,430px)] items-center gap-3 rounded-md border border-orchid/20 bg-white/70 px-4 text-slate-500 shadow-sm transition focus-within:border-orchid dark:border-white/10 dark:bg-white/10 xl:flex">
              <Search size={19} />
              <input className="w-full bg-transparent text-sm outline-none dark:text-white" placeholder="Search or jump to..." />
              <span className="inline-flex items-center gap-1 rounded-md border border-plum/10 bg-white px-2 py-1 text-xs font-bold text-slate-500 dark:border-white/10 dark:bg-black/20 dark:text-slate-300">
                <Command size={12} />K
              </span>
            </label>
            <div className="flex items-center justify-start gap-2 xl:justify-end">
              <button className="focus-ring relative inline-flex h-10 w-10 items-center justify-center rounded-md border border-plum/20 bg-white/80 text-plum shadow-sm transition hover:-translate-y-0.5 hover:border-orchid dark:border-white/10 dark:bg-white/10 dark:text-white" title="Notifications" aria-label="Notifications">
                <Bell size={18} />
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-amberline" />
              </button>
              <ThemeToggle />
              <div className="hidden min-w-0 items-center gap-3 rounded-md border border-plum/10 bg-white/80 px-3 py-2 shadow-sm dark:border-white/10 dark:bg-white/10 sm:flex">
                <span className="grid h-9 w-9 place-items-center rounded-md bg-amberline text-sm font-black text-white">{(session?.name || "S").slice(0, 1)}</span>
                <div>
                  <p className="truncate text-sm font-black text-ink dark:text-white">{session?.name || "Guest"}</p>
                  <p className="truncate text-xs text-slate-500 dark:text-slate-300">{session?.role || role}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={logout}
                className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-md border border-plum/20 bg-white/80 text-plum shadow-sm transition hover:-translate-y-0.5 hover:border-coral dark:border-white/10 dark:bg-white/10 dark:text-white"
                aria-label="Logout"
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>
          <nav className="mt-4 flex gap-2 overflow-x-auto lg:hidden">
            {items.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href || (item.href !== "/admin/dashboard" && pathname.startsWith(`${item.href}/`));
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`inline-flex shrink-0 items-center gap-2 rounded-md px-3 py-2 text-sm font-bold ${
                    active ? "bg-plum text-white dark:bg-white dark:text-plum" : "bg-white/80 text-plum dark:bg-white/10 dark:text-slate-200"
                  }`}
                >
                  <Icon size={16} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </header>
        <main className="px-4 py-6 sm:px-6 lg:px-10">{children}</main>
      </div>
    </div>
  );
}
