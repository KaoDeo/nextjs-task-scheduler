import { TaskStatus } from "./task-status";

export interface Task {
  id: string;
  name: string;
  description: string;
  status: TaskStatus;
  createdAt: string;
  updatedAt?: string;
  scheduledAt?: string;
  startedAt?: string;
  pausedAt?: string;
  resumedAt?: string;
  cancelledAt?: string;
  completedAt?: string;
  priority?: number;
  error?: string;
}
