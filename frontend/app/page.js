"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem("todo_session") || "null");
    if (!session) {
      router.replace("/login");
      return;
    }
    router.replace(session.role === "ADMIN" ? "/admin/dashboard" : "/user/todos");
  }, [router]);

  return <main className="min-h-screen bg-paper dark:bg-ink" />;
}
