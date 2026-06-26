// Fullscreen / keep-awake helpers.
// Safe Expo-compatible APIs only. Nothing here may throw if an API is missing.

import {
  activateKeepAwakeAsync,
  deactivateKeepAwake
} from "expo-keep-awake";

const KEEP_AWAKE_TAG = "mini-traffic-signs-game";

// System bars are controlled declaratively by <SystemBars hidden /> from
// react-native-edge-to-edge in App.js. This function exists so callers have a
// single, safe entry point and so future native tweaks stay in one place.
export function enableStickyImmersiveMode() {
  try {
    // No imperative call is required for edge-to-edge sticky immersive mode;
    // SystemBars handles it. Kept as a safe no-op wrapper.
    return true;
  } catch (e) {
    return false;
  }
}

// Activate keep-awake for the active game screen only.
export async function activateGameKeepAwake() {
  try {
    await activateKeepAwakeAsync(KEEP_AWAKE_TAG);
  } catch (e) {
    // Ignore: keeping the screen awake is a nicety, never required.
  }
}

// Release keep-awake when leaving the game screen.
export function deactivateGameKeepAwake() {
  try {
    deactivateKeepAwake(KEEP_AWAKE_TAG);
  } catch (e) {
    // Ignore: safe to call even if it was never activated.
  }
}

// Generic safe release used by non-game screens to ensure awake is not held.
export function disableKeepAwakeSafely() {
  try {
    deactivateKeepAwake(KEEP_AWAKE_TAG);
  } catch (e) {
    // Ignore.
  }
}
