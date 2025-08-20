"use client";

import { useState, useEffect } from "react";
import { Task } from "../core/types";
import { enqueue, run, pause, resume, cancel } from "../core/scheduler";
import TaskRow from "./TaskRow";
import AddTaskForm from "./AddTaskForm";

export default function TaskTable() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);

  // Mock tasks for demo - in real app this would come from API/database
  useEffect(() => {
    const mockTasks: Task[] = [
      {
        id: "1",
        name: "Process Data Export",
        description: "Export user data to CSV format",
        status: "pending",
        executionTime: 5000,
        createdAt: new Date().toISOString(),
        scheduledAt: new Date(Date.now() + 10000).toISOString(), // 10s from now
      },
      {
        id: "2",
        name: "Send Email Campaign",
        description: "Send weekly newsletter to subscribers",
        status: "running",
        executionTime: 2000,
        createdAt: new Date().toISOString(),
        scheduledAt: new Date(Date.now() + 5000).toISOString(), // 5s from now
        startedAt: new Date().toISOString(),
      },
      {
        id: "3",
        name: "Generate Report",
        description: "Generate monthly analytics report",
        status: "paused",
        executionTime: 8000,
        createdAt: new Date().toISOString(),
        scheduledAt: new Date(Date.now() + 20000).toISOString(), // 20s from now
        pausedAt: new Date().toISOString(),
      },
    ];
    setTasks(mockTasks);
  }, []);

  const handleAddTask = (newTask: Omit<Task, "id" | "createdAt">) => {
    const task: Task = {
      ...newTask,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };

    try {
      enqueue(task);
      setTasks((prev) => [...prev, task]);
      setShowAddForm(false);
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  };

  const handleAction = async (
    taskId: string,
    action: "run" | "pause" | "resume" | "cancel"
  ) => {
    try {
      switch (action) {
        case "run":
          run(taskId);
          break;
        case "pause":
          pause(taskId);
          break;
        case "resume":
          resume(taskId);
          break;
        case "cancel":
          cancel(taskId);
          break;
      }

      // Update task status locally (in real app, this would come from API)
      setTasks((prev) =>
        prev.map((task) =>
          task.id === taskId
            ? {
                ...task,
                status:
                  action === "run" ? "running" : (action as Task["status"]),
                updatedAt: new Date().toISOString(),
                [`${action}edAt`]: new Date().toISOString(),
              }
            : task
        )
      );
    } catch (error) {
      console.error(`Failed to ${action} task:`, error);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Task Scheduler</h1>
          <p className="text-gray-600 mt-2">
            Manage and monitor your scheduled tasks
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add New Task
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">
                  Task
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">
                  Status
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">
                  Execution Time
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">
                  Scheduled At
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">
                  Priority
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {tasks.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-gray-500">
                    <div className="flex flex-col items-center gap-3">
                      <svg
                        className="w-12 h-12 text-gray-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        />
                      </svg>
                      <div>
                        <p className="text-lg font-medium">
                          No tasks scheduled
                        </p>
                        <p className="text-sm">
                          Add your first task to get started
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                tasks.map((task) => (
                  <TaskRow key={task.id} task={task} onAction={handleAction} />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showAddForm && (
        <AddTaskForm
          onSubmit={handleAddTask}
          onCancel={() => setShowAddForm(false)}
        />
      )}
    </div>
  );
}
