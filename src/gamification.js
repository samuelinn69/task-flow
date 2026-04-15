const POINTS_PER_COMPLETION = 10;
const ALL_TASKS_DAILY_BONUS = 25;

function toDateString(dateLike) {
  return new Date(dateLike).toISOString().slice(0, 10);
}

function getYesterday(dateLike) {
  const date = new Date(dateLike);
  date.setUTCDate(date.getUTCDate() - 1);
  return date.toISOString().slice(0, 10);
}

function getTodaysTasks(tasks, today) {
  return tasks.filter((task) => task.createdAt && toDateString(task.createdAt) === today);
}

function shouldApplyAllTasksBonus(state, today) {
  const todaysTasks = getTodaysTasks(state.tasks, today);
  if (todaysTasks.length === 0) return false;

  const allCompleted = todaysTasks.every((task) => task.completed);
  if (!allCompleted) return false;

  return state.lastAllCompletedBonusDate !== today;
}

export function applyCompletionRewards(state) {
  const today = toDateString(Date.now());
  const previous = state.lastCompletionDate;

  let streak = state.streak;

  if (!previous) {
    streak = 1;
  } else if (previous === today) {
    streak = state.streak;
  } else if (previous === getYesterday(Date.now())) {
    streak = state.streak + 1;
  } else {
    streak = 1;
  }

  const hasDailyBonus = shouldApplyAllTasksBonus(state, today);
  const bonusPoints = hasDailyBonus ? ALL_TASKS_DAILY_BONUS : 0;

  return {
    ...state,
    points: state.points + POINTS_PER_COMPLETION + bonusPoints,
    streak,
    lastCompletionDate: today,
    lastAllCompletedBonusDate: hasDailyBonus ? today : state.lastAllCompletedBonusDate,
  };
}
