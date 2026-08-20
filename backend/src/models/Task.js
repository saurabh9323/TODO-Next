class Task {
  constructor({
    id = null,
    title,
    description = "",
    status = "TODO",
    priority = "MEDIUM",
    dueDate = null,
    userId = null,
    categoryId = null,
    createdAt = new Date(),
    updatedAt = new Date(),
  }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.status = status;
    this.priority = priority;
    this.dueDate = dueDate;
    this.userId = userId;
    this.categoryId = categoryId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  markComplete() {
    if (this.status === "COMPLETED") {
      throw new Error("Task is already completed");
    }

    this.status = "COMPLETED";
    this.updatedAt = new Date();
  }

  changePriority(priority) {
    const validPriorities = ["LOW", "MEDIUM", "HIGH"];

    if (!validPriorities.includes(priority)) {
      throw new Error("Invalid priority");
    }

    this.priority = priority;
    this.updatedAt = new Date();
  }

  updateDetails({ title, description, priority, dueDate, status, categoryId }) {
    if (title !== undefined) this.title = title;
    if (description !== undefined) this.description = description;
    if (priority !== undefined) this.changePriority(priority);
    if (dueDate !== undefined) this.dueDate = dueDate;
    if (status !== undefined) this.status = status;
    if (categoryId !== undefined) this.categoryId = categoryId;

    this.updatedAt = new Date();
  }
}

module.exports = Task;
