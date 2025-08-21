import { Task } from "../components/tasks/types";

const priorityQueue: Task[] = [];
const currentTime = new Date();

export const executeTask = async (task: Task): Promise<Task> => {
  console.log(`🚀 Starting execution of task: ${task.name} (${task.type})`);

  const startTime = Date.now();

  try {
    // Update task status to running
    const runningTask: Task = {
      ...task,
      status: "running",
      startedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Get the appropriate handler for this task type
    const handler = taskHandlers[task.type];
    if (!handler) {
      throw new Error(`No handler found for task type: ${task.type}`);
    }

    // Execute the task
    const result = await handler(task.params as any);

    const endTime = Date.now();
    const actualExecutionTime = endTime - startTime;

    console.log(
      `✅ Task completed: ${task.name} (took ${actualExecutionTime}ms)`
    );

    // Return completed task with result
    return {
      ...runningTask,
      status: "completed",
      completedAt: new Date().toISOString(),
      result: result,
      executionTime: actualExecutionTime, // Update with actual time
    };
  } catch (error) {
    const endTime = Date.now();
    const actualExecutionTime = endTime - startTime;

    console.error(`❌ Task failed: ${task.name}`, error);

    // Return failed task with error
    return {
      ...task,
      status: "cancelled", // or add "failed" status
      cancelledAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      error: error instanceof Error ? error.message : String(error),
      executionTime: actualExecutionTime,
    };
  }
};

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
  // todo: implement cancel logic
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

const processingLoop = () => {
  while (currentTime < new Date()) {
    const task = dequeue();
    if (task) {
      executeTask(task);
    }
  }
};
