import React from "react";
import { Task, TaskStatus } from "../core/types";

interface TaskRowProps {
  task: Task;
  onAction: (
    taskId: string,
    action: "run" | "pause" | "resume" | "cancel"
  ) => void;
}

const statusColors: Record<TaskStatus, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  running: "bg-green-100 text-green-800",
  paused: "bg-orange-100 text-orange-800",
  completed: "bg-blue-100 text-blue-800",
  cancelled: "bg-red-100 text-red-800",
};

const statusIcons: Record<TaskStatus, React.ReactElement> = {
  pending: (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  running: (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.5a1.5 1.5 0 011.5 1.5M9 10h1.5a1.5 1.5 0 011.5 1.5v1a1.5 1.5 0 01-1.5 1.5H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  paused: (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  completed: (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  cancelled: (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
};

export default function TaskRow({ task, onAction }: TaskRowProps) {
  const formatTime = (ms: number) => {
    if (ms < 1000) return `${ms}ms`;
    if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
    return `${(ms / 60000).toFixed(1)}m`;
  };

  const formatDateTime = (dateString?: string) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const calculatePriority = () => {
    if (!task.scheduledAt) return "-";
    const diff = new Date(task.scheduledAt).getTime() - new Date().getTime();
    return diff > 0 ? `${Math.ceil(diff / 1000)}s` : "Due";
  };

  const getAvailableActions = () => {
    switch (task.status) {
      case "pending":
        return [
          { action: "run" as const, label: "Run", variant: "primary" },
          { action: "cancel" as const, label: "Cancel", variant: "danger" },
        ];
      case "running":
        return [
          { action: "pause" as const, label: "Pause", variant: "secondary" },
          { action: "cancel" as const, label: "Cancel", variant: "danger" },
        ];
      case "paused":
        return [
          { action: "resume" as const, label: "Resume", variant: "primary" },
          { action: "cancel" as const, label: "Cancel", variant: "danger" },
        ];
      case "completed":
      case "cancelled":
        return [];
      default:
        return [];
    }
  };

  const getButtonClasses = (variant: string) => {
    const baseClasses =
      "px-3 py-1.5 text-sm font-medium rounded-md transition-colors";
    switch (variant) {
      case "primary":
        return `${baseClasses} bg-blue-600 text-white hover:bg-blue-700`;
      case "secondary":
        return `${baseClasses} bg-gray-600 text-white hover:bg-gray-700`;
      case "danger":
        return `${baseClasses} bg-red-600 text-white hover:bg-red-700`;
      default:
        return baseClasses;
    }
  };

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="py-4 px-6">
        <div className="max-w-xs">
          <h3 className="font-semibold text-gray-900 truncate">{task.name}</h3>
          <p className="text-sm text-gray-600 truncate">{task.description}</p>
        </div>
      </td>
      <td className="py-4 px-6">
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${
            statusColors[task.status]
          }`}
        >
          {statusIcons[task.status]}
          {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
        </span>
      </td>
      <td className="py-4 px-6 text-gray-900 font-mono">
        {formatTime(task.executionTime)}
      </td>
      <td className="py-4 px-6 text-gray-600">
        {formatDateTime(task.scheduledAt)}
      </td>
      <td className="py-4 px-6">
        <span className="text-sm font-medium text-gray-900">
          {calculatePriority()}
        </span>
      </td>
      <td className="py-4 px-6">
        <div className="flex items-center gap-2">
          {getAvailableActions().map(({ action, label, variant }) => (
            <button
              key={action}
              onClick={() => onAction(task.id, action)}
              className={getButtonClasses(variant)}
            >
              {label}
            </button>
          ))}
          {getAvailableActions().length === 0 && (
            <span className="text-sm text-gray-400">No actions</span>
          )}
        </div>
      </td>
    </tr>
  );
}
