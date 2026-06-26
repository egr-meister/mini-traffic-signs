// Local learning progress helpers.
// Progress and achievements are local progress markers only and have NO value
// beyond learning. No game-currency or gambling-style concepts anywhere.

import { getUnlockedAchievements } from "../data/achievementItems";

export function createDefaultProgress() {
  return {
    learnedSignIds: [],
    unlockedAchievementIds: []
  };
}

export function mergeProgress(loaded) {
  const base = createDefaultProgress();
  if (!loaded || typeof loaded !== "object") {
    return base;
  }
  if (Array.isArray(loaded.learnedSignIds)) {
    base.learnedSignIds = loaded.learnedSignIds.filter(
      (id) => typeof id === "string"
    );
  }
  if (Array.isArray(loaded.unlockedAchievementIds)) {
    base.unlockedAchievementIds = loaded.unlockedAchievementIds.filter(
      (id) => typeof id === "string"
    );
  }
  return base;
}

export function markSignLearned(progress, signId) {
  const next = mergeProgress(progress);
  if (signId && !next.learnedSignIds.includes(signId)) {
    next.learnedSignIds = [...next.learnedSignIds, signId];
  }
  return next;
}

// Recompute unlocked achievements from current stats and merge them in.
export function updateAchievements(progress, stats) {
  const next = mergeProgress(progress);
  const unlocked = getUnlockedAchievements(stats);
  const merged = new Set([...next.unlockedAchievementIds, ...unlocked]);
  next.unlockedAchievementIds = Array.from(merged);
  return next;
}

export function getAchievementIds(progress) {
  const next = mergeProgress(progress);
  return next.unlockedAchievementIds;
}

export function resetProgress() {
  return createDefaultProgress();
}
