// Local learning statistics helpers.
// Pure functions only. Never return NaN. Always merge with default stats.

import { SIGN_IDS } from "../data/signItems";

function safeNum(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

export function createDefaultStats() {
  const bySign = {};
  SIGN_IDS.forEach((id) => {
    bySign[id] = { correct: 0, incorrect: 0 };
  });

  return {
    correct: 0,
    incorrect: 0,
    byGameMode: {
      find_sign: { correct: 0, incorrect: 0 },
      safe_action: { correct: 0, incorrect: 0 }
    },
    bySign
  };
}

// Deep-merge loaded stats into a fresh default so missing keys are filled in.
export function mergeStats(loaded) {
  const base = createDefaultStats();
  if (!loaded || typeof loaded !== "object") {
    return base;
  }

  base.correct = safeNum(loaded.correct);
  base.incorrect = safeNum(loaded.incorrect);

  Object.keys(base.byGameMode).forEach((mode) => {
    base.byGameMode[mode] = {
      correct: safeNum(loaded?.byGameMode?.[mode]?.correct),
      incorrect: safeNum(loaded?.byGameMode?.[mode]?.incorrect)
    };
  });

  Object.keys(base.bySign).forEach((signId) => {
    base.bySign[signId] = {
      correct: safeNum(loaded?.bySign?.[signId]?.correct),
      incorrect: safeNum(loaded?.bySign?.[signId]?.incorrect)
    };
  });

  return base;
}

export function recordAnswer(stats, gameMode, signId, isCorrect) {
  const next = mergeStats(stats);
  const mode = next.byGameMode[gameMode] ? gameMode : "find_sign";
  const correct = Boolean(isCorrect);

  if (correct) {
    next.correct += 1;
    next.byGameMode[mode].correct += 1;
    if (signId && next.bySign[signId]) {
      next.bySign[signId].correct += 1;
    }
  } else {
    next.incorrect += 1;
    next.byGameMode[mode].incorrect += 1;
    if (signId && next.bySign[signId]) {
      next.bySign[signId].incorrect += 1;
    }
  }

  return next;
}

export function getTotalCorrect(stats) {
  return safeNum(stats?.correct);
}

export function getTotalIncorrect(stats) {
  return safeNum(stats?.incorrect);
}

export function getTotalAnswered(stats) {
  return getTotalCorrect(stats) + getTotalIncorrect(stats);
}

export function resetStats() {
  return createDefaultStats();
}
