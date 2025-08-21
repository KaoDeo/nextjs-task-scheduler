"use client";

import { useState } from "react";
import { enqueue } from "../../core/scheduler";
import AddTaskForm from "./AddTaskForm";
import TaskRow from "./TaskRow";
import { Task } from "./types";

export default function TaskTable() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);

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

  const handleAction = () => {
    // TODO: Implement action handling
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
                  Scheduled At
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
