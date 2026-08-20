"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Eye, Plus, Search, ShieldCheck, Trash2, UserRoundCheck } from "lucide-react";
import { deleteUser, fetchUsers } from "@/lib/api";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [role, setRole] = useState("ALL");

  useEffect(() => {
    fetchUsers().then(setUsers);
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const text = `${user.name} ${user.email} ${user.userName}`.toLowerCase();
      const matchesSearch = text.includes(query.toLowerCase());
      const matchesRole = role === "ALL" || user.role === role;
      return matchesSearch && matchesRole;
    });
  }, [query, role, users]);

  async function removeUser(id) {
    await deleteUser(id);
    setUsers((current) => current.filter((user) => String(user.id) !== String(id)));
  }

  return (
    <div className="animate-rise space-y-5">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-black uppercase tracking-wide text-orchid">User master</p>
          <h2 className="text-3xl font-black text-ink dark:text-white">All users</h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">Manage access, roles, status, and future MFA enrollment.</p>
        </div>
        <Link href="/admin/users/add" className="primary-button py-3">
          <Plus size={17} />
          Add user
        </Link>
      </div>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          ["Total users", users.length, UserRoundCheck],
          ["Admins", users.filter((user) => user.role === "ADMIN").length, ShieldCheck],
          ["Active", users.filter((user) => user.status === "ACTIVE").length, UserRoundCheck]
        ].map(([label, value, Icon]) => (
          <div key={label} className="surface card-hover flex items-center gap-4 p-4">
            <span className="grid h-12 w-12 place-items-center rounded-md bg-orchid/10 text-orchid">
              <Icon size={20} />
            </span>
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-slate-500 dark:text-slate-300">{label}</p>
              <p className="text-2xl font-black text-plum dark:text-white">{value}</p>
            </div>
          </div>
        ))}
      </section>

      <div className="surface grid gap-3 p-3 md:grid-cols-[1fr_180px]">
        <label className="flex items-center gap-3 rounded-md border border-plum/10 bg-blush/70 px-3 py-2 dark:border-white/10 dark:bg-black/20">
          <Search size={18} className="text-orchid" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="w-full bg-transparent text-sm text-ink outline-none dark:text-white"
            placeholder="Search users"
          />
        </label>
        <select
          value={role}
          onChange={(event) => setRole(event.target.value)}
          className="field py-2 text-sm font-bold"
        >
          <option value="ALL">All roles</option>
          <option value="ADMIN">Admin</option>
          <option value="USER">User</option>
        </select>
      </div>

      <div className="surface overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-lilac text-xs uppercase tracking-wide text-plum dark:bg-white/10 dark:text-slate-300">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Created</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/10">
              {filteredUsers.map((user) => (
                <tr key={user.id || user.email} className="text-slate-700 transition hover:bg-blush/80 dark:text-slate-200 dark:hover:bg-white/5">
                  <td className="px-4 py-4 font-bold text-ink dark:text-white">{user.name}</td>
                  <td className="px-4 py-4">{user.email}</td>
                  <td className="px-4 py-4">
                    <span className="rounded-md bg-orchid/10 px-2 py-1 text-xs font-black text-orchid">{user.role}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`rounded-md px-2 py-1 text-xs font-black ${user.status === "ACTIVE" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">{user.createdAt || "-"}</td>
                  <td className="px-4 py-4">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/users/${user.id || user.email}`} className="focus-ring inline-flex h-9 w-9 items-center justify-center rounded-md border border-plum/10 text-plum transition hover:-translate-y-0.5 hover:border-orchid hover:text-orchid dark:border-white/10 dark:text-white" title="View user">
                        <Eye size={16} />
                      </Link>
                      <button onClick={() => removeUser(user.id)} className="focus-ring inline-flex h-9 w-9 items-center justify-center rounded-md border border-plum/10 text-plum transition hover:-translate-y-0.5 hover:border-coral hover:text-coral dark:border-white/10 dark:text-white" title="Delete user">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
