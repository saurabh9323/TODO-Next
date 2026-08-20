"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save } from "lucide-react";
import { createUser } from "@/lib/api";

export default function AddUserPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    userName: "",
    email: "",
    role: "USER",
    status: "ACTIVE",
    passwordHash: ""
  });

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function submit(event) {
    event.preventDefault();
    await createUser(form);
    router.push("/admin/users");
  }

  return (
    <div className="animate-rise mx-auto max-w-3xl">
      <div className="mb-5">
        <p className="text-sm font-black uppercase tracking-wide text-orchid">User master</p>
        <h2 className="text-3xl font-black text-ink dark:text-white">Add user</h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">Create a role-aware profile ready for OTP, OAuth, and MFA rollout.</p>
      </div>
      <form onSubmit={submit} className="surface card-hover space-y-4 p-5">
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            ["name", "Full name"],
            ["userName", "Username"],
            ["email", "Email"],
            ["passwordHash", "Temporary password"]
          ].map(([field, label]) => (
            <label key={field} className="block">
              <span className="mb-2 block text-sm font-bold text-slate-600 dark:text-slate-200">{label}</span>
              <input
                value={form[field]}
                onChange={(event) => updateField(field, event.target.value)}
                type={field === "email" ? "email" : field === "passwordHash" ? "password" : "text"}
                required={field !== "passwordHash"}
                className="field"
              />
            </label>
          ))}
          <label className="block">
            <span className="mb-2 block text-sm font-bold text-slate-600 dark:text-slate-200">Role</span>
            <select value={form.role} onChange={(event) => updateField("role", event.target.value)} className="field">
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
            </select>
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-bold text-slate-600 dark:text-slate-200">Status</span>
            <select value={form.status} onChange={(event) => updateField("status", event.target.value)} className="field">
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </select>
          </label>
        </div>
        <button className="primary-button px-5 py-3">
          <Save size={17} />
          Save user
        </button>
      </form>
    </div>
  );
}
