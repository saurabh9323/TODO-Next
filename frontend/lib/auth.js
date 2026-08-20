export const demoAccounts = {
  admin: {
    name: "Admin Lead",
    email: "admin@todo.app",
    role: "ADMIN"
  },
  user: {
    name: "Team Member",
    email: "user@todo.app",
    role: "USER"
  }
};

export function setSession(session) {
  localStorage.setItem("todo_session", JSON.stringify(session));
}

export function getSession() {
  if (typeof window === "undefined") return null;
  return JSON.parse(localStorage.getItem("todo_session") || "null");
}

export function clearSession() {
  localStorage.removeItem("todo_session");
}
