// Local learning progress markers only.
// Achievements have NO monetary value. They are simple friendly badges.

export const ACHIEVEMENT_ITEMS = [
  {
    id: "first_sign_badge",
    label: "First Sign Badge",
    emoji: "⭐",
    description: "Answer 1 question correctly."
  },
  {
    id: "stop_sign_helper_badge",
    label: "Stop Sign Helper Badge",
    emoji: "🛑",
    description: "Answer 5 Stop questions correctly."
  },
  {
    id: "light_learner_badge",
    label: "Light Learner Badge",
    emoji: "🚦",
    description: "Answer 5 Traffic Light questions correctly."
  },
  {
    id: "crosswalk_buddy_badge",
    label: "Crosswalk Buddy Badge",
    emoji: "🚸",
    description: "Answer 5 Crosswalk questions correctly."
  },
  {
    id: "friendly_sign_star",
    label: "Friendly Sign Star",
    emoji: "🏅",
    description: "Answer 20 questions correctly."
  }
];

function safeNum(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

// Returns the array of unlocked achievement IDs based on the given stats.
export function getUnlockedAchievements(stats) {
  const unlocked = [];

  const totalCorrect = safeNum(stats?.correct);
  const stopCorrect = safeNum(stats?.bySign?.stop?.correct);
  const lightCorrect = safeNum(stats?.bySign?.traffic_light?.correct);
  const crosswalkCorrect = safeNum(stats?.bySign?.crosswalk?.correct);

  if (totalCorrect >= 1) {
    unlocked.push("first_sign_badge");
  }
  if (stopCorrect >= 5) {
    unlocked.push("stop_sign_helper_badge");
  }
  if (lightCorrect >= 5) {
    unlocked.push("light_learner_badge");
  }
  if (crosswalkCorrect >= 5) {
    unlocked.push("crosswalk_buddy_badge");
  }
  if (totalCorrect >= 20) {
    unlocked.push("friendly_sign_star");
  }

  return unlocked;
}

export function getAchievementItem(achievementId) {
  if (!achievementId) {
    return null;
  }
  return ACHIEVEMENT_ITEMS.find((item) => item?.id === achievementId) ?? null;
}
