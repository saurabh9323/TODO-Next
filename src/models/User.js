class User {
  constructor({
    name,
    email,
    passwordHash,
    createdAt = new Date(),
    updatedAt = new Date(),
    status = "ACTIVE",
    role = "USER",
    userName = null,
  }) {
    this.name = name;
    this.email = email;
    this.passwordHash = passwordHash;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.status = status;
    this.role = role;
    this.userName = userName;
  }

  deleteUser() {
    if (this.status === "DELETED") {
      throw new Error("User is already deleted");
    }

    this.status = "DELETED";
    this.updatedAt = new Date();
  }

  activateUser() {
    if (this.status === "ACTIVE") {
      throw new Error("User is already active");
    }

    this.status = "ACTIVE";
    this.updatedAt = new Date();
  }

  deactivateUser() {
    if (this.status === "INACTIVE") {
      throw new Error("User is already inactive");
    }

    this.status = "INACTIVE";
    this.updatedAt = new Date();
  }

  changeRole(role) {
    const validRoles = ["USER", "ADMIN"];

    if (!validRoles.includes(role)) {
      throw new Error("Invalid role");
    }

    this.role = role;
    this.updatedAt = new Date();
  }

  updateProfile({ name, email, userName }) {
    if (name !== undefined) this.name = name;
    if (email !== undefined) this.email = email;
    if (userName !== undefined) this.userName = userName;

    this.updatedAt = new Date();
  }
}

module.exports = User;