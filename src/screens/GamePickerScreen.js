import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import ScreenContainer from "../components/ScreenContainer";
import GameModeCard from "../components/GameModeCard";
import DifficultyChip from "../components/DifficultyChip";
import AppButton from "../components/AppButton";
import colors from "../theme/colors";

import { GAME_MODES } from "../utils/signGameHelpers";
import { loadAppData } from "../storage/appStorage";
import { disableKeepAwakeSafely } from "../utils/immersiveHelpers";

const DIFFICULTIES = [
  { id: "easy", label: "Easy" },
  { id: "medium", label: "Medium" },
  { id: "hard", label: "Hard" }
];

export default function GamePickerScreen({ navigation }) {
  const [gameMode, setGameMode] = useState(null);
  const [difficulty, setDifficulty] = useState(null);
  const [message, setMessage] = useState("");

  useFocusEffect(
    useCallback(() => {
      let active = true;
      disableKeepAwakeSafely();
      loadAppData().then((data) => {
        if (active) {
          // Pre-select the parent's default difficulty as a friendly default.
          setDifficulty((prev) => prev ?? (data?.settings?.defaultDifficulty ?? "easy"));
        }
      });
      return () => {
        active = false;
      };
    }, [])
  );

  function handleStart() {
    if (!gameMode) {
      setMessage("Please choose a game.");
      return;
    }
    if (!difficulty) {
      setMessage("Please choose a difficulty.");
      return;
    }
    setMessage("");
    navigation.navigate("SignGame", { gameMode, difficulty });
  }

  return (
    <ScreenContainer>
      <Text style={[styles.title, { color: colors?.text ?? "#2E3440" }]}>
        Choose a Game
      </Text>
      <Text style={[styles.subtitle, { color: colors?.mutedText ?? "#7B8794" }]}>
        Pick a friendly game and a difficulty.
      </Text>

      <GameModeCard
        title="Find the Sign"
        description="Look and choose the matching sign."
        emoji="🚦"
        selected={gameMode === GAME_MODES.FIND_SIGN}
        onPress={() => setGameMode(GAME_MODES.FIND_SIGN)}
      />
      <GameModeCard
        title="Choose the Safe Action"
        description="Choose a friendly safe action."
        emoji="🚸"
        selected={gameMode === GAME_MODES.SAFE_ACTION}
        onPress={() => setGameMode(GAME_MODES.SAFE_ACTION)}
      />

      <Text style={[styles.sectionLabel, { color: colors?.text ?? "#2E3440" }]}>
        Difficulty
      </Text>
      <View style={styles.chipRow}>
        {DIFFICULTIES.map((d) => (
          <DifficultyChip
            key={d.id}
            label={d.label}
            selected={difficulty === d.id}
            onPress={() => setDifficulty(d.id)}
          />
        ))}
      </View>

      {message ? (
        <Text style={[styles.message, { color: colors?.danger ?? "#E76F51" }]}>
          {message}
        </Text>
      ) : null}

      <AppButton label="Start Game" variant="primary" onPress={handleStart} />
      <AppButton
        label="Back"
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
    marginTop: 6
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 6,
    marginBottom: 14
  },
  sectionLabel: {
    fontSize: 20,
    fontWeight: "800",
    marginTop: 18,
    marginBottom: 4
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  message: {
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 12
  }
});
