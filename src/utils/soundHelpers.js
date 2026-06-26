// Gentle correct-answer feedback.
// No heavy audio libraries, no microphone, no permissions.
// Visual feedback always works even when no audio is available.

import { Vibration, Platform } from "react-native";

// Plays a soft, optional cue when the child answers correctly.
// If sound is disabled or a cue cannot play, this returns safely with no error.
export function playCorrectSoundIfEnabled(settings) {
  const enabled = settings?.soundEnabled ?? true;
  if (!enabled) {
    return;
  }

  // We avoid bundling audio assets. A very short, gentle haptic tap is used as
  // a calm confirmation on Android. This is wrapped so it can never throw.
  try {
    if (Platform.OS === "android" && typeof Vibration?.vibrate === "function") {
      Vibration.vibrate(30);
    }
  } catch (e) {
    // Intentionally ignore: feedback is optional and must never break the app.
  }
}
