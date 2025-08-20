import { Task } from "./types";

const priorityQueue: Task[] = [];

export const enqueue = (task: Task) => {
  if (task && task.scheduledAt) {
    priorityQueue.push({
      ...task,
      priority: diffMs(task.scheduledAt, new Date().toISOString()),
    });
    bubbleUp();
  } else {
    throw new Error("Task is required");
  }
};

export const dequeue = () => {
  if (priorityQueue.length === 0) return null;
  return priorityQueue.pop();
};

export const run = (taskId: string) => {
  // todo:
};

export const resume = (taskId: string) => {
  // todo:
};

export const pause = (taskId: string) => {
  // todo:
};

export const cancel = (taskId: string) => {
  // todo:
};

const bubbleUp = () => {
  let idx = priorityQueue.length - 1;
  const element = priorityQueue[idx];

  while (idx > 0) {
    const parentIdx = Math.floor((idx - 1) / 2);
    const parent = priorityQueue[parentIdx];

    if (!element.priority || !parent.priority) break;
    // max heap
    if (element.priority <= parent.priority) break;

    //swap
    priorityQueue[parentIdx] = element;
    priorityQueue[idx] = parent;
    idx = parentIdx;
  }

  return priorityQueue;
};

const diffMs = (date1: string, date2: string) => {
  if (!date1 || !date2) return 0;
  return new Date(date1).getTime() - new Date(date2).getTime();
};
