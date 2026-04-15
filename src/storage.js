const STORAGE_KEY = 'taskflow-state-v1';

const defaultState = {
  tasks: [],
  points: 0,
  streak: 0,
  lastCompletionDate: null,
  lastAllCompletedBonusDate: null,
  personality: 'motivador',
};

export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...defaultState };
    const parsed = JSON.parse(raw);
    return {
      ...defaultState,
      ...parsed,
      tasks: Array.isArray(parsed.tasks) ? parsed.tasks : [],
    };
  } catch {
    return { ...defaultState };
  }
}

export function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}
