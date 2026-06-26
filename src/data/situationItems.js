// Friendly "safe action" situations for Mini Traffic Signs.
// No dangerous scenes, no realistic traffic danger, no child-independent
// road instructions, and no scary wording.

export const SITUATION_ITEMS = [
  {
    id: "situation_stop_wait",
    signId: "stop",
    prompt: "What should we do at Stop?",
    correctAction: "Stop and wait.",
    emoji: "🛑"
  },
  {
    id: "situation_light_wait",
    signId: "traffic_light",
    prompt: "What should we do at a traffic light?",
    correctAction: "Look at the light and wait.",
    emoji: "🚦"
  },
  {
    id: "situation_crosswalk_grownup",
    signId: "crosswalk",
    prompt: "What should we do near a crosswalk?",
    correctAction: "Cross with a grown-up.",
    emoji: "🚸"
  },
  {
    id: "situation_bus_wait",
    signId: "bus_stop",
    prompt: "What should we do at a bus stop?",
    correctAction: "Wait near the bus stop.",
    emoji: "🚏"
  }
];

const FALLBACK_SITUATION = SITUATION_ITEMS[0];

export function getSituationItem(situationId) {
  if (!situationId) {
    return FALLBACK_SITUATION;
  }
  const found = SITUATION_ITEMS.find((item) => item?.id === situationId);
  return found ?? FALLBACK_SITUATION;
}

export function getSituationsForSign(signId) {
  if (!signId) {
    return [];
  }
  return SITUATION_ITEMS.filter((item) => item?.signId === signId);
}
