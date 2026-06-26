import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import colors from "../theme/colors";

// Wraps screen content with safe-area padding so nothing overlaps notches,
// camera cutouts, or rounded corners. Optionally scrolls long content.
export default function ScreenContainer({ children, scroll = true, center = false }) {
  const insets = useSafeAreaInsets();
  const bg = colors?.background ?? "#FFF8EC";

  const padding = {
    paddingTop: (insets?.top ?? 0) + 16,
    paddingBottom: (insets?.bottom ?? 0) + 24,
    paddingLeft: (insets?.left ?? 0) + 20,
    paddingRight: (insets?.right ?? 0) + 20
  };

  if (scroll) {
    return (
      <View style={[styles.root, { backgroundColor: bg }]}>
        <ScrollView
          contentContainerStyle={[
            padding,
            center && styles.center,
            styles.scrollContent
          ]}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.root,
        { backgroundColor: bg },
        padding,
        center && styles.center
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  scrollContent: {
    flexGrow: 1
  },
  center: {
    justifyContent: "center"
  }
});
