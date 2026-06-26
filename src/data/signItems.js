// Sign cards for Mini Traffic Signs.
// Calm, toy-like, friendly. No realistic roads, no scary scenes.
// Every safeAction text is unique so game answer choices never collide.

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
  },
  {
    id: "pedestrian",
    label: "Walk",
    emoji: "🚶",
    meaning: "A friendly place to walk.",
    safeAction: "Walk with a grown-up."
  },
  {
    id: "bike_lane",
    label: "Bike Lane",
    emoji: "🚲",
    meaning: "A path for bikes.",
    safeAction: "Ride your bike here."
  },
  {
    id: "school_zone",
    label: "School Zone",
    emoji: "🏫",
    meaning: "School is near.",
    safeAction: "Go slowly near school."
  },
  {
    id: "railway_crossing",
    label: "Railway Crossing",
    emoji: "🚂",
    meaning: "A train may pass here.",
    safeAction: "Wait for the train with a grown-up."
  },
  {
    id: "parking",
    label: "Parking",
    emoji: "🅿️",
    meaning: "A place where cars wait.",
    safeAction: "Cars wait here."
  },
  {
    id: "roundabout",
    label: "Roundabout",
    emoji: "🔄",
    meaning: "Cars go around here.",
    safeAction: "Go slowly and look, with a grown-up."
  },
  {
    id: "one_way",
    label: "One Way",
    emoji: "➡️",
    meaning: "Cars go this way.",
    safeAction: "See which way cars go, with a grown-up."
  },
  {
    id: "animal_crossing",
    label: "Animal Crossing",
    emoji: "🦆",
    meaning: "Animals may cross here.",
    safeAction: "Look for animals, with a grown-up."
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
