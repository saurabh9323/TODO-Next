class Category {
  constructor({
    id = null,
    name,
    description = "",
    status = "ACTIVE",
    createdAt = new Date(),
    updatedAt = new Date(),
  }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  updateDetails({ name, description, status }) {
    if (name !== undefined) this.name = name;
    if (description !== undefined) this.description = description;
    if (status !== undefined) this.status = status;

    this.updatedAt = new Date();
  }

  deleteCategory() {
    if (this.status === "DELETED") {
      throw new Error("Category is already deleted");
    }

    this.status = "DELETED";
    this.updatedAt = new Date();
  }
}

module.exports = Category;
