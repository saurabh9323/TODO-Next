# Nivotime CRM

A Next.js 14 (App Router) + TypeScript + Tailwind + shadcn/ui + Redux Toolkit
starter for a role-based CRM: multi-role accounts with a portal switcher (no
dropdowns), a permission system where every button/page checks "can this role
do this action?", a command palette (⌘K), and a dark-mode sidebar layout.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000 — you'll be redirected to `/login`.

## Demo accounts

| Email | Password | Portals |
|---|---|---|
| admin@demo.com | admin123 | **Admin + Manager + Sales** (multi-role — shows the portal picker) |
| manager@demo.com | manager123 | Manager only (skips straight to dashboard) |
| agent@demo.com | agent123 | Sales only |

Click any row on the login screen to auto-fill the fields.

## What's new in this version

### Multi-role accounts, no dropdown
A user's account can hold more than one role. Log in as `admin@demo.com` and
you'll land on **Select a portal** — a card grid (not a `<select>`), because
picking which context you're working in deserves more than one native
dropdown line. Once inside, switch anytime via:
- the portal badge/button in the top bar → opens a `Dialog` with the same card grid,
- the avatar menu → "Switch portal",
- or the command palette (⌘K) → type "switch" and pick a portal directly.

Single-role accounts (`manager@demo.com`, `agent@demo.com`) skip the picker
entirely and go straight to their dashboard.

### shadcn/ui, hand-built (no CLI network dependency)
`src/components/ui/*` contains standard shadcn-style primitives — Button,
Card, Badge, Avatar, Dialog, Popover, Command (cmdk), Input, Label, Separator,
Tooltip — built on Radix UI + `class-variance-authority` + `tailwind-merge`,
themed with the same CSS-variable convention shadcn projects use
(`globals.css` defines `--background`, `--primary`, `--accent`, etc. for both
`:root` and `.dark`).

### Command palette (⌘K / Ctrl+K)
Press `⌘K` anywhere inside the app: search & jump to any page you have
permission to view, switch portals, change the theme, or log out — all from
one keyboard-first surface.

### Redesigned, branded login
A two-panel login: the right side is the sign-in form, the left is a dark
ink-navy brand panel with **Nivotime's** signature — a vertical amber
"timeline pulse" running top to bottom, echoing a lead's journey through
Lead → Contacted → Qualified → Won. It's a small motif, but it's the one
visual idea the whole brand hangs off of (also echoed as the pulsing dot on
the sidebar logomark).

### Notifications
A lightweight notifications popover in the top bar (dummy data) — the kind of
thing every real CRM ends up needing, so it's scaffolded in from the start.

## How the pieces fit together

### 1. Auth + role gate — you can't reach any page without logging in and picking a portal
- **`src/middleware.ts`** runs on every request at the edge. It checks a
  `crm_auth` cookie; if missing and the path isn't `/login`, it redirects to
  `/login?next=<path>`. If the user is authenticated but hasn't chosen an
  active role yet (`crm_active_role` cookie missing — true for multi-role
  accounts right after login), it redirects to `/select-role`. It also blocks
  `/users` for anyone whose active role isn't `admin`/`manager`.
- **`src/components/AuthGuard.tsx`** is a client-side second layer inside
  `src/app/(protected)/layout.tsx`, mirroring the same two checks (user exists,
  active role exists) against Redux state — covers the moment right after
  logout/switch, before cookies round-trip.
- Login (`src/app/login/page.tsx`) checks the typed email/password against
  `DUMMY_USERS`, dispatches `loginSuccess`. If the matched user has more than
  one role, it's sent to `/select-role`; otherwise straight to `/dashboard`.

### 2. Redux — single source of truth for everything
`src/redux/store.ts` combines four slices:
- **`authSlice`** — `user` (with a `roles: Role[]` array) + `activeRole`
  (the one currently in use), login/logout/`setActiveRole`, localStorage +
  cookie sync.
- **`themeSlice`** — light / dark / **system**, persisted, toggles the `dark`
  class on `<html>`.
- **`uiSlice`** — sidebar collapsed/expanded, command palette open/closed.
- **`leadsSlice`** — the CRM's dummy lead records, with add/delete/update reducers.

`src/redux/hooks.ts` exports typed `useAppSelector` / `useAppDispatch` — use
these everywhere instead of the untyped react-redux hooks.

### 3. Role-based permissions (RBAC)
Everything reads from one table, **`src/lib/permissions.ts`**:

```ts
ROLE_PERMISSIONS = {
  admin:   { leads: [view,create,edit,delete], users: [view,create,edit,delete], ... },
  manager: { leads: [view,create,edit,delete], users: [view], ... },
  agent:   { leads: [view,create,edit], users: [], ... },
}
```

- **`<PermissionGate resource="leads" action="delete">`** wraps any UI element
  that should only render if the *currently active* role is allowed to
  perform that action. Used throughout `leads`, `users`, `reports`, and
  `settings` pages.
- **`Sidebar.tsx`** and **`CommandPalette.tsx`** filter their links the same
  way, so a Sales rep never even sees a "Users" link or command.
- **`middleware.ts`** enforces the same rule at the routing layer for the one
  route (`/users`) that should be unreachable, not just unlinked.

`src/lib/permissions.ts` also holds `PORTALS` — the display name, tagline,
and gradient each role's portal card uses on `/select-role` and in the
switch dialog.

To add a new role or resource: extend `Role`/`Resource` in `src/lib/types.ts`,
add its row to `ROLE_PERMISSIONS` and `PORTALS` — every gate, card, and
command picks it up automatically.

### 4. Different layout per role
`src/app/(protected)/dashboard/page.tsx` renders a different set of stat cards
and content depending on `activeRole` (admin sees company-wide numbers,
manager sees team numbers, agent sees only their own pipeline) while sharing
the same sidebar/topbar shell (`ProtectedShell.tsx`).

### 5. Dark mode
Tailwind is configured with `darkMode: "class"`. `themeSlice` toggles the
`dark` class on `<html>` and persists the choice (light / dark / system);
switch it from the top bar's sun/moon icon or the command palette.

## Structure

```
src/
  app/
    login/page.tsx                # public, branded split-screen
    select-role/page.tsx           # full-page portal picker (multi-role users)
    (protected)/                   # everything below requires auth + a chosen role
      layout.tsx                    # AuthGuard + ProtectedShell wrapper
      dashboard/page.tsx             # role-specific content
      leads/page.tsx                  # CRUD demo, gated by permissions
      users/page.tsx                   # admin/manager only
      reports/page.tsx
      settings/page.tsx
  components/
    ui/                             # shadcn-style primitives (button, card, dialog, command, ...)
    Sidebar.tsx, Topbar.tsx, ProtectedShell.tsx
    AuthGuard.tsx, PermissionGate.tsx
    PortalGrid.tsx, PortalSwitchDialog.tsx, CommandPalette.tsx, NotificationsPopover.tsx
    Providers.tsx, AppInit.tsx
  redux/
    store.ts, hooks.ts, slices/{auth,theme,ui,leads}Slice.ts
  lib/
    types.ts, permissions.ts, dummyData.ts, utils.ts
  middleware.ts
```

## Swapping in a real backend

Replace `DUMMY_USERS`/`DUMMY_LEADS` and the credential check in
`login/page.tsx` with real API calls, and set the cookies from your API
response (ideally an httpOnly session cookie set server-side, rather than the
client-side `js-cookie` used here for demo simplicity).
