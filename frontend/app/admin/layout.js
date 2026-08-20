import { AppShell } from "@/components/app-shell";

export default function AdminLayout({ children }) {
  return <AppShell role="ADMIN">{children}</AppShell>;
}
