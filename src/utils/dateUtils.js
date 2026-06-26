// Small date helpers. Always safe on missing or invalid dates.

export function getNowIso() {
  try {
    return new Date().toISOString();
  } catch (e) {
    return "";
  }
}

export function formatDateTime(isoString) {
  if (!isoString) {
    return "";
  }
  try {
    const d = new Date(isoString);
    if (isNaN(d.getTime())) {
      return "";
    }
    const date = d.toLocaleDateString();
    const time = d.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });
    return date + " " + time;
  } catch (e) {
    return "";
  }
}
