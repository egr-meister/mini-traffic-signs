import React from "react";
import { View, Text, StyleSheet } from "react-native";

import colors from "../theme/colors";

// A soft rounded badge that shows a friendly sign emoji.
// size: number (diameter). Used on cards and answer buttons.
export default function SignIconView({ emoji = "🚦", size = 88, tint }) {
  const dim = Number.isFinite(size) ? size : 88;
  const background = tint ?? colors?.softYellow ?? "#FFE8A3";

  return (
    <View
      style={[
        styles.circle,
        {
          width: dim,
          height: dim,
          borderRadius: dim / 2,
          backgroundColor: background,
          borderColor: colors?.border ?? "#F1E3C8"
        }
      ]}
    >
      <Text style={{ fontSize: dim * 0.5 }}>{emoji}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2
  }
});
