import React from "react";
import { Text, Pressable, StyleSheet } from "react-native";

import colors from "../theme/colors";

// Large, rounded, child-friendly tap target.
// variant: "primary" | "secondary" | "accent" | "soft" | "danger"
export default function AppButton({
  label,
  onPress,
  variant = "primary",
  disabled = false,
  style
}) {
  const bgMap = {
    primary: colors?.primary ?? "#5FA777",
    secondary: colors?.secondary ?? "#7AB7D8",
    accent: colors?.accent ?? "#FFD166",
    soft: colors?.card ?? "#FFFFFF",
    danger: colors?.danger ?? "#E76F51"
  };
  const textMap = {
    primary: "#FFFFFF",
    secondary: "#FFFFFF",
    accent: colors?.text ?? "#2E3440",
    soft: colors?.text ?? "#2E3440",
    danger: "#FFFFFF"
  };

  const backgroundColor = bgMap[variant] ?? bgMap.primary;
  const textColor = textMap[variant] ?? "#FFFFFF";

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor,
          borderColor: variant === "soft" ? colors?.border ?? "#F1E3C8" : "transparent",
          borderWidth: variant === "soft" ? 2 : 0,
          opacity: disabled ? 0.5 : pressed ? 0.85 : 1
        },
        style
      ]}
    >
      <Text style={[styles.label, { color: textColor }]}>{label ?? ""}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 64,
    borderRadius: 22,
    paddingHorizontal: 24,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8
  },
  label: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center"
  }
});
