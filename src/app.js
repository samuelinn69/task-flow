import { loadState, saveState } from './storage.js';
import { addTask, completeTask, removeTask } from './tasks.js';
import { applyCompletionRewards } from './gamification.js';
import {
  getAssistantMessage,
  getValidPersonalities,
  normalizePersonality,
} from './personality.js';
import { renderMessage, renderStats, renderTasks } from './ui.js';

const refs = {
  taskForm: document.querySelector('#task-form'),
  taskInput: document.querySelector('#task-input'),
  taskList: document.querySelector('#task-list'),
  points: document.querySelector('#points'),
  streak: document.querySelector('#streak'),
  message: document.querySelector('#assistant-message'),
  personalitySelect: document.querySelector('#personality-select'),
};

let state = loadState();

function persistAndRender() {
  saveState(state);
  renderTasks(state.tasks, refs);
  renderStats(state, refs);
}

function updateMessage(eventType = 'idle') {
  const text = getAssistantMessage(state.personality, eventType, state.streak);
  renderMessage(text, refs);
}

function onCreateTask(event) {
  event.preventDefault();

  const title = refs.taskInput.value;
  const { tasks, created } = addTask(state.tasks, title);
  if (!created) return;

  state = { ...state, tasks };
  refs.taskForm.reset();
  persistAndRender();
  updateMessage('idle');
}

function onTaskActions(event) {
  const actionButton = event.target.closest('[data-action]');
  if (!actionButton) return;

  const row = event.target.closest('[data-task-id]');
  if (!row) return;
  const taskId = row.dataset.taskId;

  if (actionButton.dataset.action === 'delete') {
    state = { ...state, tasks: removeTask(state.tasks, taskId) };
    persistAndRender();
    updateMessage('idle');
    return;
  }

  if (actionButton.dataset.action === 'complete') {
    const previousTask = state.tasks.find((task) => task.id === taskId);
    if (!previousTask || previousTask.completed) return;

    state = { ...state, tasks: completeTask(state.tasks, taskId) };

    const pointsBefore = state.points;
    state = applyCompletionRewards(state);
    const pointsGained = state.points - pointsBefore;

    persistAndRender();
    updateMessage(pointsGained > 10 ? 'completed_all' : 'completed');
  }
}

function onPersonalityChange(event) {
  state = { ...state, personality: normalizePersonality(event.target.value) };
  saveState(state);
  updateMessage('idle');
}

function init() {
  state = { ...state, personality: normalizePersonality(state.personality) };

  const validPersonalities = getValidPersonalities();
  const currentValue = validPersonalities.includes(state.personality)
    ? state.personality
    : validPersonalities[0];

  refs.personalitySelect.value = currentValue;
  refs.taskForm.addEventListener('submit', onCreateTask);
  refs.taskList.addEventListener('click', onTaskActions);
  refs.personalitySelect.addEventListener('change', onPersonalityChange);

  persistAndRender();
  updateMessage('idle');
}

init();
