import React from "react";
import { Text, Pressable, StyleSheet, View } from "react-native";

import colors from "../theme/colors";

// A large answer choice. After answering it can show correct / chosen states.
// state: "idle" | "correct" | "wrong"
export default function AnswerCard({
  label,
  emoji,
  big = false,
  state = "idle",
  disabled = false,
  onPress
}) {
  const borderByState = {
    idle: colors?.border ?? "#F1E3C8",
    correct: colors?.success ?? "#52B788",
    wrong: colors?.danger ?? "#E76F51"
  };
  const bgByState = {
    idle: colors?.card ?? "#FFFFFF",
    correct: "#E8F6EE",
    wrong: "#FBE9E3"
  };

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        big && styles.big,
        {
          backgroundColor: bgByState[state] ?? bgByState.idle,
          borderColor: borderByState[state] ?? borderByState.idle,
          borderWidth: state === "idle" ? 2 : 3,
          opacity: disabled ? (state === "idle" ? 0.6 : 1) : pressed ? 0.9 : 1
        }
      ]}
    >
      <View style={styles.row}>
        {emoji ? (
          <Text style={[styles.emoji, big && styles.emojiBig]}>{emoji}</Text>
        ) : null}
        <Text
          style={[
            styles.label,
            big && styles.labelBig,
            { color: colors?.text ?? "#2E3440" }
          ]}
        >
          {label ?? ""}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 72,
    borderRadius: 22,
    padding: 16,
    marginVertical: 8,
    justifyContent: "center"
  },
  big: {
    minHeight: 120
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  emoji: {
    fontSize: 34,
    marginRight: 12
  },
  emojiBig: {
    fontSize: 56,
    marginRight: 16
  },
  label: {
    fontSize: 20,
    fontWeight: "700",
    flexShrink: 1,
    textAlign: "center"
  },
  labelBig: {
    fontSize: 26,
    fontWeight: "800"
  }
});
