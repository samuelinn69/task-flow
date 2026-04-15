function normalizeTitle(title) {
  return title.trim().replace(/\s+/g, ' ');
}

export function createTask(title) {
  const cleanedTitle = normalizeTitle(title);
  if (!cleanedTitle) return null;

  return {
    id: crypto.randomUUID(),
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

export function toggleTaskCompleted(tasks, taskId) {
  return tasks.map((task) => {
    if (task.id !== taskId) return task;

    const isCompleting = !task.completed;
    return {
      ...task,
      completed: isCompleting,
      completedAt: isCompleting ? new Date().toISOString() : null,
    };
  });
}
