// Sign cards for Mini Traffic Signs.
// Calm, toy-like, friendly. No realistic roads, no scary scenes.

export const SIGN_ITEMS = [
  {
    id: "stop",
    label: "Stop",
    emoji: "🛑",
    meaning: "Stop and wait.",
    safeAction: "Stop and wait."
  },
  {
    id: "traffic_light",
    label: "Traffic Light",
    emoji: "🚦",
    meaning: "Look at the light and wait.",
    safeAction: "Look at the light and wait."
  },
  {
    id: "crosswalk",
    label: "Crosswalk",
    emoji: "🚸",
    meaning: "A place to cross with a grown-up.",
    safeAction: "Cross with a grown-up."
  },
  {
    id: "bus_stop",
    label: "Bus Stop",
    emoji: "🚏",
    meaning: "A place to wait for the bus.",
    safeAction: "Wait near the bus stop."
  }
];

// Always-safe fallback so callers never receive undefined.
const FALLBACK_SIGN = SIGN_ITEMS[0];

export function getAllSigns() {
  return Array.isArray(SIGN_ITEMS) ? SIGN_ITEMS.slice() : [];
}

export function getSignItem(signId) {
  if (!signId) {
    return FALLBACK_SIGN;
  }
  const found = SIGN_ITEMS.find((item) => item?.id === signId);
  return found ?? FALLBACK_SIGN;
}

export const SIGN_IDS = SIGN_ITEMS.map((item) => item.id);
