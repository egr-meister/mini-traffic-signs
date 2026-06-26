// Calm sign-learning question builders.
// No timers, no countdowns, no scary scenes, no dangerous instructions.
// Every question always includes the correct answer and never has duplicates.

import { getAllSigns, getSignItem } from "../data/signItems";
import { SITUATION_ITEMS } from "../data/situationItems";

export const GAME_MODES = {
  FIND_SIGN: "find_sign",
  SAFE_ACTION: "safe_action"
};

const GAME_MODE_LABELS = {
  find_sign: "Find the Sign",
  safe_action: "Choose the Safe Action"
};

export function getGameModeLabel(gameMode) {
  return GAME_MODE_LABELS[gameMode] ?? "Find the Sign";
}

export function getChoiceCountForDifficulty(difficulty) {
  switch (difficulty) {
    case "medium":
      return 3;
    case "hard":
      return 4;
    case "easy":
    default:
      return 2;
  }
}

// Fisher-Yates shuffle that returns a new array (never mutates input).
export function shuffleArray(items) {
  const arr = Array.isArray(items) ? items.slice() : [];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
}

export function isCorrectAnswer(selectedId, correctId) {
  if (selectedId == null || correctId == null) {
    return false;
  }
  return selectedId === correctId;
}

function makeQuestionId() {
  return "question_" + Date.now() + "_" + Math.floor(Math.random() * 100000);
}

function pickRandom(items) {
  const arr = Array.isArray(items) ? items : [];
  if (arr.length === 0) {
    return null;
  }
  return arr[Math.floor(Math.random() * arr.length)];
}

// Build "Find the Sign": choose the matching sign card from options.
// excludeSignId (optional) avoids repeating the previous question's sign.
export function buildFindSignQuestion(difficulty, excludeSignId) {
  const signs = getAllSigns();
  const count = Math.min(getChoiceCountForDifficulty(difficulty), signs.length);

  // Prefer a target different from the previous one when possible.
  let targetPool = signs;
  if (excludeSignId && signs.length > 1) {
    const filtered = signs.filter((s) => s.id !== excludeSignId);
    if (filtered.length > 0) {
      targetPool = filtered;
    }
  }
  const target = pickRandom(targetPool) ?? getSignItem("stop");

  // Start with the correct sign, then add unique distractors.
  const chosen = [target];
  const pool = shuffleArray(signs.filter((s) => s.id !== target.id));
  for (let i = 0; i < pool.length && chosen.length < count; i++) {
    chosen.push(pool[i]);
  }

  const choices = shuffleArray(chosen).map((s) => ({
    id: s.id,
    label: s.label,
    emoji: s.emoji
  }));

  return {
    id: makeQuestionId(),
    gameMode: GAME_MODES.FIND_SIGN,
    difficulty: difficulty ?? "easy",
    prompt: "Find " + target.label + ".",
    signId: target.id,
    correctAnswerId: target.id,
    correctLabel: target.label,
    correctEmoji: target.emoji,
    choices
  };
}

// Build "Choose the Safe Action": pick the friendly safe action for the sign.
// excludeSignId (optional) avoids repeating the previous question's situation.
export function buildSafeActionQuestion(difficulty, excludeSignId) {
  const signs = getAllSigns();

  let situationPool = SITUATION_ITEMS;
  if (excludeSignId && SITUATION_ITEMS.length > 1) {
    const filtered = SITUATION_ITEMS.filter((s) => s?.signId !== excludeSignId);
    if (filtered.length > 0) {
      situationPool = filtered;
    }
  }
  const situation = pickRandom(situationPool);

  // If no situation data, fall back to a Find the Sign question safely.
  if (!situation) {
    return buildFindSignQuestion(difficulty, excludeSignId);
  }

  const correctSign = getSignItem(situation.signId);
  const count = Math.min(getChoiceCountForDifficulty(difficulty), signs.length);

  // Each choice is a friendly safe action sourced from a sign.
  const correctChoice = {
    id: correctSign.id,
    label: correctSign.safeAction,
    emoji: correctSign.emoji
  };

  const chosen = [correctChoice];
  const pool = shuffleArray(signs.filter((s) => s.id !== correctSign.id));
  for (let i = 0; i < pool.length && chosen.length < count; i++) {
    chosen.push({
      id: pool[i].id,
      label: pool[i].safeAction,
      emoji: pool[i].emoji
    });
  }

  const choices = shuffleArray(chosen);

  return {
    id: makeQuestionId(),
    gameMode: GAME_MODES.SAFE_ACTION,
    difficulty: difficulty ?? "easy",
    prompt: situation.prompt,
    signId: correctSign.id,
    situationEmoji: situation.emoji,
    correctAnswerId: correctSign.id,
    correctLabel: correctSign.safeAction,
    correctEmoji: correctSign.emoji,
    choices
  };
}

// Main entry: returns a fully-formed question for the requested mode.
// excludeSignId (optional) prevents repeating the previous question's sign.
export function buildSignQuestion(gameMode, difficulty, excludeSignId) {
  const mode = gameMode ?? GAME_MODES.FIND_SIGN;
  const level = difficulty ?? "easy";

  if (mode === GAME_MODES.SAFE_ACTION) {
    return buildSafeActionQuestion(level, excludeSignId);
  }
  return buildFindSignQuestion(level, excludeSignId);
}
