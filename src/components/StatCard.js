import React from "react";
import { View, Text, StyleSheet } from "react-native";

import colors from "../theme/colors";

// A small rounded tile showing one statistic value with a friendly label.
export default function StatCard({ label, value, emoji, tint }) {
  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: tint ?? colors?.card ?? "#FFFFFF",
          borderColor: colors?.border ?? "#F1E3C8"
        }
      ]}
    >
      {emoji ? <Text style={styles.emoji}>{emoji}</Text> : null}
      <Text style={[styles.value, { color: colors?.text ?? "#2E3440" }]}>
        {value ?? 0}
      </Text>
      <Text style={[styles.label, { color: colors?.mutedText ?? "#7B8794" }]}>
        {label ?? ""}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    borderWidth: 2,
    padding: 16,
    margin: 6,
    minWidth: 130,
    flexGrow: 1,
    alignItems: "center"
  },
  emoji: {
    fontSize: 28,
    marginBottom: 4
  },
  value: {
    fontSize: 28,
    fontWeight: "900"
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 2
  }
});
