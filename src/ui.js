export function renderStats(state, refs) {
  refs.points.textContent = `${state.points}`;
  refs.streak.textContent = `${state.streak} 🔥`;
}

export function renderMessage(message, refs) {
  refs.message.textContent = message;
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function taskItemTemplate(task) {
  const completionLabel = task.completed ? 'Completada' : 'Completar';

  return `
    <li class="task ${task.completed ? 'task--completed' : ''}" data-task-id="${task.id}">
      <p class="task__title">${escapeHtml(task.title)}</p>
      <button class="task__btn task__btn--complete" data-action="complete" ${
        task.completed ? 'disabled' : ''
      }>
        ${completionLabel}
      </button>
      <button class="task__btn task__btn--delete" data-action="delete">
        Eliminar
      </button>
    </li>
  `;
}

export function renderTasks(tasks, refs) {
  if (tasks.length === 0) {
    refs.taskList.innerHTML = '<li class="empty">Aún no hay tareas. Crea la primera 🚀</li>';
    return;
  }

  refs.taskList.innerHTML = tasks.map(taskItemTemplate).join('');
}
