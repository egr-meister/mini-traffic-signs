import React from "react";
import { Text, Pressable, StyleSheet } from "react-native";

import colors from "../theme/colors";

// A rounded selectable chip for difficulty (Easy / Medium / Hard).
export default function DifficultyChip({ label, selected = false, onPress }) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        {
          backgroundColor: selected
            ? colors?.secondary ?? "#7AB7D8"
            : colors?.card ?? "#FFFFFF",
          borderColor: selected
            ? colors?.secondary ?? "#7AB7D8"
            : colors?.border ?? "#F1E3C8",
          opacity: pressed ? 0.9 : 1
        }
      ]}
    >
      <Text
        style={[
          styles.label,
          { color: selected ? "#FFFFFF" : colors?.text ?? "#2E3440" }
        ]}
      >
        {label ?? ""}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    minHeight: 56,
    borderRadius: 18,
    borderWidth: 2,
    paddingHorizontal: 20,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 6,
    marginVertical: 6,
    flexGrow: 1
  },
  label: {
    fontSize: 18,
    fontWeight: "800"
  }
});
