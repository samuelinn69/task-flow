const POINTS_PER_COMPLETION = 10;

function toDateString(dateLike) {
  return new Date(dateLike).toISOString().slice(0, 10);
}

function getYesterday(dateLike) {
  const date = new Date(dateLike);
  date.setUTCDate(date.getUTCDate() - 1);
  return date.toISOString().slice(0, 10);
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

  return {
    ...state,
    points: state.points + POINTS_PER_COMPLETION,
    streak,
    lastCompletionDate: today,
  };
}
