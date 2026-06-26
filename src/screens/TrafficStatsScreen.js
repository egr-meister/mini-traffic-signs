import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import ScreenContainer from "../components/ScreenContainer";
import StatCard from "../components/StatCard";
import AppButton from "../components/AppButton";
import EmptyState from "../components/EmptyState";
import colors from "../theme/colors";

import { loadAppData, resetLearningStats, resetLearningProgress, createDefaultAppData } from "../storage/appStorage";
import {
  getTotalCorrect,
  getTotalIncorrect,
  getTotalAnswered
} from "../utils/statsHelpers";
import { ACHIEVEMENT_ITEMS } from "../data/achievementItems";

export default function TrafficStatsScreen({ navigation }) {
  const [data, setData] = useState(createDefaultAppData());

  const reload = useCallback(() => {
    let active = true;
    loadAppData().then((loaded) => {
      if (active) {
        setData(loaded ?? createDefaultAppData());
      }
    });
    return () => {
      active = false;
    };
  }, []);

  useFocusEffect(reload);

  const stats = data?.stats;
  const correct = getTotalCorrect(stats);
  const incorrect = getTotalIncorrect(stats);
  const total = getTotalAnswered(stats);
  const learned = data?.progress?.learnedSignIds?.length ?? 0;
  const unlockedIds = data?.progress?.unlockedAchievementIds ?? [];

  const findCorrect = stats?.byGameMode?.find_sign?.correct ?? 0;
  const findIncorrect = stats?.byGameMode?.find_sign?.incorrect ?? 0;
  const safeCorrect = stats?.byGameMode?.safe_action?.correct ?? 0;
  const safeIncorrect = stats?.byGameMode?.safe_action?.incorrect ?? 0;

  const hasProgress = total + learned + unlockedIds.length > 0;

  function handleReset() {
    Alert.alert(
      "Reset Stats",
      "Are you sure you want to reset sign learning progress?",
      [
        { text: "Keep", style: "cancel" },
        {
          text: "Reset",
          style: "destructive",
          onPress: async () => {
            await resetLearningStats();
            await resetLearningProgress();
            reload();
          }
        }
      ]
    );
  }

  return (
    <ScreenContainer>
      <Text style={[styles.title, { color: colors?.text ?? "#2E3440" }]}>
        My Stats
      </Text>

      {!hasProgress ? (
        <EmptyState
          emoji="🚦"
          title="No sign progress yet"
          message="Play a calm game to begin learning."
        />
      ) : (
        <>
          <View style={styles.grid}>
            <StatCard label="Correct answers" value={correct} emoji="✅" />
            <StatCard label="Good tries" value={incorrect} emoji="⭐" />
            <StatCard label="Total answers" value={total} emoji="🚸" />
            <StatCard label="Signs learned" value={learned} emoji="🚦" />
            <StatCard
              label="Achievements"
              value={unlockedIds.length}
              emoji="🏅"
            />
          </View>

          <Text style={[styles.section, { color: colors?.text ?? "#2E3440" }]}>
            By Game
          </Text>
          <View style={styles.grid}>
            <StatCard
              label="Find the Sign correct"
              value={findCorrect}
              emoji="🔎"
            />
            <StatCard
              label="Find the Sign tries"
              value={findIncorrect}
              emoji="⭐"
            />
            <StatCard
              label="Safe Action correct"
              value={safeCorrect}
              emoji="🚸"
            />
            <StatCard
              label="Safe Action tries"
              value={safeIncorrect}
              emoji="⭐"
            />
          </View>

          <Text style={[styles.section, { color: colors?.text ?? "#2E3440" }]}>
            Achievements
          </Text>
          {ACHIEVEMENT_ITEMS.map((item) => {
            const unlocked = unlockedIds.includes(item.id);
            return (
              <View
                key={item.id}
                style={[
                  styles.badgeRow,
                  {
                    backgroundColor: colors?.card ?? "#FFFFFF",
                    borderColor: unlocked
                      ? colors?.success ?? "#52B788"
                      : colors?.border ?? "#F1E3C8",
                    opacity: unlocked ? 1 : 0.6
                  }
                ]}
              >
                <Text style={styles.badgeEmoji}>{unlocked ? item.emoji : "🔒"}</Text>
                <View style={styles.badgeText}>
                  <Text style={[styles.badgeTitle, { color: colors?.text ?? "#2E3440" }]}>
                    {item.label}
                  </Text>
                  <Text style={[styles.badgeDesc, { color: colors?.mutedText ?? "#7B8794" }]}>
                    {item.description}
                  </Text>
                </View>
              </View>
            );
          })}
        </>
      )}

      <AppButton label="Reset Stats" variant="danger" onPress={handleReset} />
      <AppButton
        label="Back Home"
        variant="soft"
        onPress={() => navigation.navigate("TrafficHome")}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: "900",
    textAlign: "center",
    marginTop: 6,
    marginBottom: 12
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  section: {
    fontSize: 20,
    fontWeight: "800",
    marginTop: 18,
    marginBottom: 6
  },
  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 18,
    borderWidth: 2,
    padding: 14,
    marginVertical: 6
  },
  badgeEmoji: {
    fontSize: 32,
    marginRight: 12
  },
  badgeText: {
    flex: 1
  },
  badgeTitle: {
    fontSize: 17,
    fontWeight: "800"
  },
  badgeDesc: {
    fontSize: 14,
    marginTop: 2
  }
});
