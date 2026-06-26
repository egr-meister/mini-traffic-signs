import React from "react";
import { View, Text, StyleSheet } from "react-native";

import colors from "../theme/colors";
import SignIconView from "./SignIconView";

// A calm rounded card for a single sign: icon, name, meaning, safe action.
export default function TrafficSignCard({ sign }) {
  const label = sign?.label ?? "Sign";
  const emoji = sign?.emoji ?? "🚦";
  const meaning = sign?.meaning ?? "";
  const safeAction = sign?.safeAction ?? "";

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
      <SignIconView emoji={emoji} size={96} />
      <Text style={[styles.title, { color: colors?.text ?? "#2E3440" }]}>
        {label}
      </Text>
      <Text style={[styles.meaning, { color: colors?.mutedText ?? "#7B8794" }]}>
        {meaning}
      </Text>
      <View
        style={[
          styles.actionPill,
          {
            backgroundColor: colors?.softYellow ?? "#FFE8A3",
            borderColor: colors?.border ?? "#F1E3C8"
          }
        ]}
      >
        <Text style={[styles.actionText, { color: colors?.text ?? "#2E3440" }]}>
          ✅ {safeAction}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    borderWidth: 2,
    padding: 20,
    marginVertical: 10,
    alignItems: "center"
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    marginTop: 14
  },
  meaning: {
    fontSize: 17,
    textAlign: "center",
    marginTop: 6
  },
  actionPill: {
    marginTop: 14,
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 10
  },
  actionText: {
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center"
  }
});
