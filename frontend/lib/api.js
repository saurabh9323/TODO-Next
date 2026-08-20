const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:6000/api";

const seedUsers = [
  {
    id: "u-1001",
    name: "Aarav Mehta",
    userName: "aarav",
    email: "aarav@example.com",
    role: "ADMIN",
    status: "ACTIVE",
    createdAt: "2026-08-01"
  },
  {
    id: "u-1002",
    name: "Nisha Rao",
    userName: "nisha",
    email: "nisha@example.com",
    role: "USER",
    status: "ACTIVE",
    createdAt: "2026-08-10"
  },
  {
    id: "u-1003",
    name: "Kabir Shah",
    userName: "kabir",
    email: "kabir@example.com",
    role: "USER",
    status: "INACTIVE",
    createdAt: "2026-08-12"
  }
];

export function getStoredUsers() {
  if (typeof window === "undefined") return seedUsers;
  const stored = localStorage.getItem("todo_users");
  if (stored) return JSON.parse(stored);
  localStorage.setItem("todo_users", JSON.stringify(seedUsers));
  return seedUsers;
}

export function saveStoredUsers(users) {
  localStorage.setItem("todo_users", JSON.stringify(users));
}

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    }
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json();
}

export async function fetchUsers() {
  try {
    const payload = await request("/users/all");
    return payload.data || [];
  } catch {
    return getStoredUsers();
  }
}

export async function createUser(user) {
  try {
    const payload = await request("/users/create", {
      method: "POST",
      body: JSON.stringify({
        ...user,
        passwordHash: user.passwordHash || "temporary-password"
      })
    });
    return payload.data;
  } catch {
    const users = getStoredUsers();
    const nextUser = {
      ...user,
      id: `u-${Date.now()}`,
      createdAt: new Date().toISOString().slice(0, 10)
    };
    saveStoredUsers([nextUser, ...users]);
    return nextUser;
  }
}

export async function updateUser(user) {
  try {
    const payload = await request("/users/update", {
      method: "PUT",
      body: JSON.stringify(user)
    });
    return payload.data;
  } catch {
    const users = getStoredUsers().map((item) =>
      String(item.id) === String(user.id) ? { ...item, ...user } : item
    );
    saveStoredUsers(users);
    return user;
  }
}

export async function deleteUser(id) {
  try {
    await request("/users/delete", {
      method: "DELETE",
      body: JSON.stringify({ id })
    });
  } catch {
    saveStoredUsers(getStoredUsers().filter((user) => String(user.id) !== String(id)));
  }
}

export async function createTask(task) {
  try {
    const payload = await request("/tasks", {
      method: "POST",
      body: JSON.stringify(task)
    });
    return payload.data;
  } catch {
    return { ...task, id: `t-${Date.now()}` };
  }
}
