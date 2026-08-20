"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchUsers, updateUser } from "@/lib/api";

export default function ViewUserPage() {
  const params = useParams();
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUsers().then((users) => {
      setUser(users.find((item) => String(item.id || item.email) === String(params.id)) || null);
    });
  }, [params.id]);

  function updateField(field, value) {
    setUser((current) => ({ ...current, [field]: value }));
  }

  async function submit(event) {
    event.preventDefault();
    await updateUser(user);
    router.push("/admin/users");
  }

  if (!user) {
    return <div className="surface p-6 text-ink dark:text-white">User not found.</div>;
  }

  return (
    <div className="animate-rise mx-auto max-w-3xl">
      <Link href="/admin/users" className="mb-5 inline-flex items-center gap-2 text-sm font-bold text-orchid">
        <ArrowLeft size={16} />
        Back to users
      </Link>
      <form onSubmit={submit} className="surface card-hover space-y-4 p-5">
        <div>
          <p className="text-sm font-black uppercase tracking-wide text-orchid">View and edit</p>
          <h2 className="text-3xl font-black text-ink dark:text-white">{user.name}</h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">Tune role, status, and identity details from one profile page.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            ["name", "Full name"],
            ["userName", "Username"],
            ["email", "Email"]
          ].map(([field, label]) => (
            <label key={field} className="block">
              <span className="mb-2 block text-sm font-bold text-slate-600 dark:text-slate-200">{label}</span>
              <input
                value={user[field] || ""}
                onChange={(event) => updateField(field, event.target.value)}
                className="field"
              />
            </label>
          ))}
          <label className="block">
            <span className="mb-2 block text-sm font-bold text-slate-600 dark:text-slate-200">Role</span>
            <select value={user.role || "USER"} onChange={(event) => updateField("role", event.target.value)} className="field">
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
            </select>
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-bold text-slate-600 dark:text-slate-200">Status</span>
            <select value={user.status || "ACTIVE"} onChange={(event) => updateField("status", event.target.value)} className="field">
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
              <option value="DELETED">Deleted</option>
            </select>
          </label>
        </div>
        <button className="primary-button px-5 py-3">
          <Save size={17} />
          Update user
        </button>
      </form>
    </div>
  );
}
