import { AppShell } from "@/components/app-shell";

export default function UserLayout({ children }) {
  return <AppShell role="USER">{children}</AppShell>;
}
