import { Task } from "../types";

export const addTask = async (task: Task) => {
  if (!task) {
    throw new Error("Task is required");
  }

  try {
    const response = await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...task, createdAt: new Date().toISOString() }),
    });

    return response.json();
  } catch (error) {
    console.error("Failed to add task:", error);
  }
};
