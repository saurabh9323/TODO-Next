class Task {
  constructor({
    title,
    description = "",
    priority = "MEDIUM",
    status = "TODO",
    userId = null,
    categoryId = null,
  }) {
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.status = status;
    this.userId = userId;
    this.categoryId = categoryId;
  }

  markComplete() {
    if (this.status === "COMPLETED") {
      throw new Error("Task is already completed");
    }

    this.status = "COMPLETED";
  }

  changePriority(priority) {
    const validPriorities = ["LOW", "MEDIUM", "HIGH"];

    if (!validPriorities.includes(priority)) {
      throw new Error("Invalid priority");
    }

    this.priority = priority;
  }
}

module.exports = Task;