import { TaskActions } from "./task-actions";
import { TaskStatus } from "./task-status";
import { ClockIcon, PlayIcon, PauseIcon, CheckIcon, XIcon } from "../../icons";

export const STATUS_OPTIONS = {
  [TaskStatus.Pending]: {
    label: "Pending",
    icon: <ClockIcon className="w-4 h-4" />,
    className: "bg-yellow-100 text-yellow-800",
    actions: [
      { action: TaskActions.Run, label: "Run", className: "bg-blue-500" },
      { action: TaskActions.Cancel, label: "Cancel", className: "bg-red-500" },
    ],
  },
  [TaskStatus.Running]: {
    label: "Running",
    icon: <PlayIcon className="w-4 h-4" />,
    className: "bg-green-100 text-green-800",
    actions: [
      { action: TaskActions.Pause, label: "Pause", className: "bg-yellow-500" },
      { action: TaskActions.Cancel, label: "Cancel", className: "bg-red-500" },
    ],
  },
  [TaskStatus.Paused]: {
    label: "Paused",
    icon: <PauseIcon className="w-4 h-4" />,
    className: "bg-orange-100 text-orange-800",
    actions: [
      {
        action: TaskActions.Resume,
        label: "Resume",
        className: "bg-green-500",
      },
      { action: TaskActions.Cancel, label: "Cancel", className: "bg-red-500" },
    ],
  },
  [TaskStatus.Completed]: {
    label: "Completed",
    icon: <CheckIcon className="w-4 h-4" />,
    className: "bg-blue-100 text-blue-800",
    actions: [],
  },
  [TaskStatus.Cancelled]: {
    label: "Cancelled",
    icon: <XIcon className="w-4 h-4" />,
    className: "bg-red-100 text-red-800",
    actions: [],
  },
};
