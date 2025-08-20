export type TaskStatus =
  | "pending"
  | "running"
  | "paused"
  | "completed"
  | "cancelled";

export interface Task {
  id: string;
  name: string;
  description: string;
  status: TaskStatus;
  executionTime: number; // in milliseconds
  createdAt: string;
  updatedAt?: string;
  scheduledAt?: string;
  startedAt?: string;
  pausedAt?: string;
  resumedAt?: string;
  cancelledAt?: string;
  completedAt?: string;
  priority?: number; // computed field for scheduling
}
