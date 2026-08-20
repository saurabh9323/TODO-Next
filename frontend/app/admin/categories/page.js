"use client";

import { useEffect, useMemo, useState } from "react";
import { Database, Edit3, Plus, Search, Trash2, X } from "lucide-react";
import { createCategory, deleteCategory, fetchCategories, updateCategory } from "@/lib/api";

const emptyForm = {
  id: "",
  name: "",
  description: "",
  status: "ACTIVE"
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("ALL");
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetchCategories().then(setCategories);
  }, []);

  const filteredCategories = useMemo(() => {
    return categories.filter((category) => {
      const text = `${category.name} ${category.description}`.toLowerCase();
      const matchesSearch = text.includes(query.toLowerCase());
      const matchesStatus = status === "ALL" || category.status === status;
      return matchesSearch && matchesStatus;
    });
  }, [categories, query, status]);

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function startEdit(category) {
    setForm(category);
    setEditing(true);
  }

  function clearForm() {
    setForm(emptyForm);
    setEditing(false);
  }

  async function submit(event) {
    event.preventDefault();
    if (editing) {
      const saved = await updateCategory(form);
      setCategories((current) => current.map((category) => String(category.id) === String(saved.id) ? saved : category));
    } else {
      const saved = await createCategory(form);
      setCategories((current) => [saved, ...current]);
    }
    clearForm();
  }

  async function removeCategory(id) {
    await deleteCategory(id);
    setCategories((current) => current.filter((category) => String(category.id) !== String(id)));
  }

  return (
    <div className="animate-rise space-y-5">
      <div className="flex flex-col justify-between gap-3 xl:flex-row xl:items-end">
        <div>
          <p className="text-sm font-black uppercase tracking-wide text-orchid">Master data</p>
          <h2 className="text-3xl font-black text-ink dark:text-white">Category master</h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">Maintain todo categories with active/inactive status and clean operational metadata.</p>
        </div>
        <button type="button" onClick={clearForm} className="soft-button self-start xl:self-auto">
          <Plus size={16} />
          New category
        </button>
      </div>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          ["Total categories", categories.length],
          ["Active", categories.filter((category) => category.status === "ACTIVE").length],
          ["Inactive", categories.filter((category) => category.status !== "ACTIVE").length]
        ].map(([label, value]) => (
          <div key={label} className="surface card-hover flex items-center gap-4 p-4">
            <span className="grid h-12 w-12 place-items-center rounded-md bg-orchid/10 text-orchid">
              <Database size={20} />
            </span>
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-slate-500 dark:text-slate-300">{label}</p>
              <p className="text-2xl font-black text-plum dark:text-white">{value}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="grid gap-5 xl:grid-cols-[0.78fr_1.22fr]">
        <form onSubmit={submit} className="surface card-hover space-y-4 p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-orchid">{editing ? "Edit record" : "Add record"}</p>
              <h3 className="text-2xl font-black text-ink dark:text-white">{editing ? form.name : "New category"}</h3>
            </div>
            {editing && (
              <button type="button" onClick={clearForm} className="soft-button h-10 w-10 px-0" title="Cancel edit">
                <X size={16} />
              </button>
            )}
          </div>

          <label className="block">
            <span className="mb-2 block text-sm font-bold text-slate-600 dark:text-slate-200">Name</span>
            <input value={form.name} onChange={(event) => updateField("name", event.target.value)} className="field" required />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-bold text-slate-600 dark:text-slate-200">Description</span>
            <textarea value={form.description} onChange={(event) => updateField("description", event.target.value)} className="field min-h-28 resize-none" />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-bold text-slate-600 dark:text-slate-200">Status</span>
            <select value={form.status} onChange={(event) => updateField("status", event.target.value)} className="field">
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
              <option value="DELETED">Deleted</option>
            </select>
          </label>
          <button className="primary-button w-full py-3">
            {editing ? <Edit3 size={16} /> : <Plus size={16} />}
            {editing ? "Update category" : "Add category"}
          </button>
        </form>

        <div className="surface overflow-hidden">
          <div className="grid gap-3 border-b border-plum/10 p-3 dark:border-white/10 md:grid-cols-[1fr_180px]">
            <label className="flex items-center gap-3 rounded-md border border-plum/10 bg-blush/70 px-3 py-2 dark:border-white/10 dark:bg-black/20">
              <Search size={18} className="text-orchid" />
              <input value={query} onChange={(event) => setQuery(event.target.value)} className="w-full bg-transparent text-sm text-ink outline-none dark:text-white" placeholder="Search categories" />
            </label>
            <select value={status} onChange={(event) => setStatus(event.target.value)} className="field py-2 text-sm font-bold">
              <option value="ALL">All status</option>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
              <option value="DELETED">Deleted</option>
            </select>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-lilac text-xs uppercase tracking-wide text-plum dark:bg-white/10 dark:text-slate-300">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Description</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Created</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/10">
                {filteredCategories.map((category) => (
                  <tr key={category.id || category.name} className="text-slate-700 transition hover:bg-blush/80 dark:text-slate-200 dark:hover:bg-white/5">
                    <td className="px-4 py-4 font-black text-ink dark:text-white">{category.name}</td>
                    <td className="px-4 py-4 text-slate-500 dark:text-slate-300">{category.description || "-"}</td>
                    <td className="px-4 py-4">
                      <span className={`rounded-md px-2 py-1 text-xs font-black ${category.status === "ACTIVE" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>
                        {category.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">{category.createdAt || "-"}</td>
                    <td className="px-4 py-4">
                      <div className="flex justify-end gap-2">
                        <button type="button" onClick={() => startEdit(category)} className="focus-ring inline-flex h-9 w-9 items-center justify-center rounded-md border border-plum/10 text-plum transition hover:-translate-y-0.5 hover:border-orchid hover:text-orchid dark:border-white/10 dark:text-white" title="Edit category">
                          <Edit3 size={16} />
                        </button>
                        <button type="button" onClick={() => removeCategory(category.id)} className="focus-ring inline-flex h-9 w-9 items-center justify-center rounded-md border border-plum/10 text-plum transition hover:-translate-y-0.5 hover:border-coral hover:text-coral dark:border-white/10 dark:text-white" title="Delete category">
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
      </section>
    </div>
  );
}
