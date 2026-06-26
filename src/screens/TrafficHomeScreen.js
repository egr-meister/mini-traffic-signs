import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import ScreenContainer from "../components/ScreenContainer";
import AppButton from "../components/AppButton";
import StatCard from "../components/StatCard";
import colors from "../theme/colors";

import { loadAppData, createDefaultAppData } from "../storage/appStorage";
import { getTotalCorrect, getTotalIncorrect } from "../utils/statsHelpers";
import { disableKeepAwakeSafely } from "../utils/immersiveHelpers";

export default function TrafficHomeScreen({ navigation }) {
  const [data, setData] = useState(createDefaultAppData());

  useFocusEffect(
    useCallback(() => {
      let active = true;
      // Static screen: make sure keep-awake is not held here.
      disableKeepAwakeSafely();
      loadAppData().then((loaded) => {
        if (active) {
          setData(loaded ?? createDefaultAppData());
        }
      });
      return () => {
        active = false;
      };
    }, [])
  );

  const correct = getTotalCorrect(data?.stats);
  const incorrect = getTotalIncorrect(data?.stats);
  const learned = data?.progress?.learnedSignIds?.length ?? 0;
  const achievements = data?.progress?.unlockedAchievementIds?.length ?? 0;
  const hasProgress = correct + incorrect + learned + achievements > 0;

  return (
    <ScreenContainer>
      <Text style={[styles.title, { color: colors?.text ?? "#2E3440" }]}>
        Mini Traffic Signs
      </Text>
      <Text style={[styles.subtitle, { color: colors?.mutedText ?? "#7B8794" }]}>
        Learn friendly signs with calm games.
      </Text>

      <View style={styles.previewWrap}>
        {hasProgress ? (
          <View style={styles.grid}>
            <StatCard label="Correct answers" value={correct} emoji="✅" />
            <StatCard label="Good tries" value={incorrect} emoji="⭐" />
            <StatCard label="Signs learned" value={learned} emoji="🚦" />
            <StatCard
              label="Achievements"
              value={achievements}
              emoji="🏅"
            />
          </View>
        ) : (
          <View
            style={[
              styles.emptyPreview,
              {
                backgroundColor: colors?.card ?? "#FFFFFF",
                borderColor: colors?.border ?? "#F1E3C8"
              }
            ]}
          >
            <Text style={styles.emptyEmoji}>🚦</Text>
            <Text style={[styles.emptyText, { color: colors?.text ?? "#2E3440" }]}>
              Start with friendly signs.
            </Text>
          </View>
        )}
      </View>

      <AppButton
        label="Start"
        variant="primary"
        onPress={() => navigation.navigate("GamePicker")}
      />
      <AppButton
        label="Sign Cards"
        variant="secondary"
        onPress={() => navigation.navigate("SignCards")}
      />
      <AppButton
        label="My Stats"
        variant="accent"
        onPress={() => navigation.navigate("TrafficStats")}
      />
      <AppButton
        label="Parent Settings"
        variant="soft"
        onPress={() => navigation.navigate("ParentSettings")}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 34,
    fontWeight: "900",
    textAlign: "center",
    marginTop: 10
  },
  subtitle: {
    fontSize: 17,
    textAlign: "center",
    marginTop: 8,
    marginBottom: 18
  },
  previewWrap: {
    marginBottom: 12
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  emptyPreview: {
    borderRadius: 22,
    borderWidth: 2,
    padding: 24,
    alignItems: "center"
  },
  emptyEmoji: {
    fontSize: 44,
    marginBottom: 8
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "700"
  }
});
