import React from "react";
import { View, Text, StyleSheet } from "react-native";

import colors from "../theme/colors";

// A gentle, friendly empty state. Never leaves a screen blank.
export default function EmptyState({ emoji = "⭐", title, message }) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.emoji}>{emoji}</Text>
      {title ? (
        <Text style={[styles.title, { color: colors?.text ?? "#2E3440" }]}>
          {title}
        </Text>
      ) : null}
      {message ? (
        <Text style={[styles.message, { color: colors?.mutedText ?? "#7B8794" }]}>
          {message}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: "center",
    padding: 24
  },
  emoji: {
    fontSize: 48,
    marginBottom: 10
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    textAlign: "center"
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 6
  }
});
