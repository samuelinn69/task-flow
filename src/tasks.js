function normalizeTitle(title) {
  return title.trim().replace(/\s+/g, ' ');
}

function createId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  return `task-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function createTask(title) {
  const cleanedTitle = normalizeTitle(title);
  if (!cleanedTitle) return null;

  return {
    id: createId(),
    title: cleanedTitle,
    completed: false,
    createdAt: new Date().toISOString(),
    completedAt: null,
  };
}

export function addTask(tasks, title) {
  const newTask = createTask(title);
  if (!newTask) {
    return { tasks, created: null };
  }

  return { tasks: [newTask, ...tasks], created: newTask };
}

export function removeTask(tasks, taskId) {
  return tasks.filter((task) => task.id !== taskId);
}

export function completeTask(tasks, taskId) {
  return tasks.map((task) => {
    if (task.id !== taskId || task.completed) return task;

    return {
      ...task,
      completed: true,
      completedAt: new Date().toISOString(),
    };
  });
}
