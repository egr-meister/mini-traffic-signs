import React from "react";
import { Text, Pressable, StyleSheet, View } from "react-native";

import colors from "../theme/colors";

// Selectable card for a game mode. Shows selected state with a soft highlight.
export default function GameModeCard({
  title,
  description,
  emoji = "🚦",
  selected = false,
  onPress
}) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: colors?.card ?? "#FFFFFF",
          borderColor: selected
            ? colors?.primary ?? "#5FA777"
            : colors?.border ?? "#F1E3C8",
          borderWidth: selected ? 3 : 2,
          opacity: pressed ? 0.9 : 1
        }
      ]}
    >
      <View style={styles.row}>
        <Text style={styles.emoji}>{emoji}</Text>
        <View style={styles.textCol}>
          <Text style={[styles.title, { color: colors?.text ?? "#2E3440" }]}>
            {title ?? ""}
          </Text>
          <Text
            style={[styles.desc, { color: colors?.mutedText ?? "#7B8794" }]}
          >
            {description ?? ""}
          </Text>
        </View>
        {selected ? (
          <Text style={[styles.check, { color: colors?.success ?? "#52B788" }]}>
            ✅
          </Text>
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 22,
    padding: 18,
    marginVertical: 8
  },
  row: {
    flexDirection: "row",
    alignItems: "center"
  },
  emoji: {
    fontSize: 40,
    marginRight: 14
  },
  textCol: {
    flex: 1
  },
  title: {
    fontSize: 20,
    fontWeight: "800"
  },
  desc: {
    fontSize: 15,
    marginTop: 4
  },
  check: {
    fontSize: 22,
    marginLeft: 10
  }
});
