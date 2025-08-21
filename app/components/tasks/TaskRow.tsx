import React from "react";
import { STATUS_OPTIONS, Task, TaskActions } from "./types";

import { format } from "date-fns";

interface TaskRowProps {
  task: Task;
  onAction: (taskId: string, action: TaskActions) => void;
}

export default function TaskRow({ task, onAction }: TaskRowProps) {
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
            STATUS_OPTIONS[task.status].className
          }`}
        >
          {STATUS_OPTIONS[task.status].icon}
          {STATUS_OPTIONS[task.status].label}
        </span>
      </td>
      <td className="py-4 px-6 text-gray-600">
        {task.scheduledAt
          ? format(new Date(task.scheduledAt), "dd/MM/yyyy HH:mm")
          : "-"}
      </td>
      <td className="py-4 px-6">
        <div className="flex items-center gap-2">
          {STATUS_OPTIONS[task.status].actions.map(
            ({ action, label, className }) => (
              <button
                key={action}
                onClick={() => onAction(task.id, action)}
                className={className}
              >
                {label}
              </button>
            )
          )}
        </div>
      </td>
    </tr>
  );
}
