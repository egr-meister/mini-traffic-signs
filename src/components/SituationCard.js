import React from "react";
import { View, Text, StyleSheet } from "react-native";

import colors from "../theme/colors";
import SignIconView from "./SignIconView";

// Shows the current friendly prompt / situation at the top of a game question.
export default function SituationCard({ prompt, emoji = "🚦", encouragement }) {
  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors?.card ?? "#FFFFFF",
          borderColor: colors?.border ?? "#F1E3C8"
        }
      ]}
    >
      <SignIconView emoji={emoji} size={104} />
      <Text style={[styles.prompt, { color: colors?.text ?? "#2E3440" }]}>
        {prompt ?? ""}
      </Text>
      {encouragement ? (
        <Text style={[styles.encourage, { color: colors?.mutedText ?? "#7B8794" }]}>
          {encouragement}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    borderWidth: 2,
    padding: 22,
    alignItems: "center",
    marginBottom: 16
  },
  prompt: {
    fontSize: 26,
    fontWeight: "800",
    textAlign: "center",
    marginTop: 14
  },
  encourage: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 8
  }
});
