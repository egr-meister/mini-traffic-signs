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
  },
  {
    id: "situation_pedestrian_walk",
    signId: "pedestrian",
    prompt: "What should we do on a walking path?",
    correctAction: "Walk with a grown-up.",
    emoji: "🚶"
  },
  {
    id: "situation_bike_lane",
    signId: "bike_lane",
    prompt: "What should we do on a bike lane?",
    correctAction: "Ride your bike here.",
    emoji: "🚲"
  },
  {
    id: "situation_school_zone",
    signId: "school_zone",
    prompt: "What should we do near a school?",
    correctAction: "Go slowly near school.",
    emoji: "🏫"
  },
  {
    id: "situation_railway_crossing",
    signId: "railway_crossing",
    prompt: "What should we do at a railway crossing?",
    correctAction: "Wait for the train with a grown-up.",
    emoji: "🚂"
  },
  {
    id: "situation_parking",
    signId: "parking",
    prompt: "What happens at a parking sign?",
    correctAction: "Cars wait here.",
    emoji: "🅿️"
  },
  {
    id: "situation_roundabout",
    signId: "roundabout",
    prompt: "What should we do near a roundabout?",
    correctAction: "Go slowly and look, with a grown-up.",
    emoji: "🔄"
  },
  {
    id: "situation_one_way",
    signId: "one_way",
    prompt: "What should we do at a one way sign?",
    correctAction: "See which way cars go, with a grown-up.",
    emoji: "➡️"
  },
  {
    id: "situation_animal_crossing",
    signId: "animal_crossing",
    prompt: "What should we do at an animal crossing?",
    correctAction: "Look for animals, with a grown-up.",
    emoji: "🦆"
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
