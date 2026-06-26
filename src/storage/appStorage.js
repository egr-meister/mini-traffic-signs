// Local-only storage for Mini Traffic Signs.
// Uses AsyncStorage. No personal data. No names, age, location, device ids,
// or behavioral tracking. No game-currency or gambling-style concepts.
//
// All reads merge stored data with defaults and recover gracefully from
// missing or corrupted JSON so the app never crashes.

import AsyncStorage from "@react-native-async-storage/async-storage";

import { createDefaultStats, mergeStats, recordAnswer } from "../utils/statsHelpers";
import {
  createDefaultProgress,
  mergeProgress,
  markSignLearned as markLearned,
  updateAchievements
} from "../utils/progressHelpers";

const STORAGE_KEY = "mini_traffic_signs_app_data_v1";

export function createDefaultSettings() {
  return {
    soundEnabled: true,
    defaultDifficulty: "easy",
    theme: "light"
  };
}

export function createDefaultAppData() {
  return {
    stats: createDefaultStats(),
    progress: createDefaultProgress(),
    settings: createDefaultSettings()
  };
}

function mergeSettings(loaded) {
  const base = createDefaultSettings();
  if (!loaded || typeof loaded !== "object") {
    return base;
  }
  return {
    soundEnabled:
      typeof loaded.soundEnabled === "boolean"
        ? loaded.soundEnabled
        : base.soundEnabled,
    defaultDifficulty:
      ["easy", "medium", "hard"].indexOf(loaded.defaultDifficulty) >= 0
        ? loaded.defaultDifficulty
        : base.defaultDifficulty,
    // This version uses a light theme only.
    theme: "light"
  };
}

function mergeAppData(loaded) {
  return {
    stats: mergeStats(loaded?.stats),
    progress: mergeProgress(loaded?.progress),
    settings: mergeSettings(loaded?.settings)
  };
}

// Always returns valid, fully-merged app data. Never throws.
export async function loadAppData() {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return createDefaultAppData();
    }
    let parsed = null;
    try {
      parsed = JSON.parse(raw);
    } catch (parseError) {
      // Corrupted JSON: fall back to defaults instead of crashing.
      return createDefaultAppData();
    }
    return mergeAppData(parsed);
  } catch (e) {
    return createDefaultAppData();
  }
}

// Saves merged app data. Returns the data that was saved.
export async function saveAppData(data) {
  const merged = mergeAppData(data);
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
  } catch (e) {
    // Ignore write errors: the in-memory state still works for this session.
  }
  return merged;
}

// Records one answer, updates stats + achievements, and persists.
export async function recordLearningAnswer(gameMode, signId, isCorrect) {
  const data = await loadAppData();
  const stats = recordAnswer(data.stats, gameMode, signId, isCorrect);
  const progress = updateAchievements(data.progress, stats);
  const next = { ...data, stats, progress };
  return saveAppData(next);
}

// Marks a sign as learned (used when a child explores its sign card).
export async function markSignLearned(signId) {
  const data = await loadAppData();
  const progress = markLearned(data.progress, signId);
  const next = { ...data, progress };
  return saveAppData(next);
}

export async function resetLearningStats() {
  const data = await loadAppData();
  const next = { ...data, stats: createDefaultStats() };
  return saveAppData(next);
}

export async function resetLearningProgress() {
  const data = await loadAppData();
  const next = { ...data, progress: createDefaultProgress() };
  return saveAppData(next);
}

export async function updateSettings(settings) {
  const data = await loadAppData();
  const merged = mergeSettings({ ...data.settings, ...settings });
  const next = { ...data, settings: merged };
  return saveAppData(next);
}

// Clears all local data, then restores default settings.
export async function clearAllData() {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    // Ignore: we still return fresh defaults below.
  }
  const fresh = createDefaultAppData();
  return saveAppData(fresh);
}
