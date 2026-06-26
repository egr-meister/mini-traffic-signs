import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, Switch, Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import ScreenContainer from "../components/ScreenContainer";
import DifficultyChip from "../components/DifficultyChip";
import AppButton from "../components/AppButton";
import colors from "../theme/colors";

import {
  loadAppData,
  updateSettings,
  clearAllData,
  createDefaultAppData
} from "../storage/appStorage";
import { disableKeepAwakeSafely } from "../utils/immersiveHelpers";

const DIFFICULTIES = [
  { id: "easy", label: "Easy" },
  { id: "medium", label: "Medium" },
  { id: "hard", label: "Hard" }
];

function Note({ children }) {
  return (
    <View
      style={[
        styles.note,
        {
          backgroundColor: colors?.card ?? "#FFFFFF",
          borderColor: colors?.border ?? "#F1E3C8"
        }
      ]}
    >
      <Text style={[styles.noteText, { color: colors?.mutedText ?? "#7B8794" }]}>
        {children}
      </Text>
    </View>
  );
}

export default function ParentSettingsScreen({ navigation }) {
  const [settings, setSettings] = useState(createDefaultAppData().settings);

  useFocusEffect(
    useCallback(() => {
      let active = true;
      disableKeepAwakeSafely();
      loadAppData().then((data) => {
        if (active) {
          setSettings(data?.settings ?? createDefaultAppData().settings);
        }
      });
      return () => {
        active = false;
      };
    }, [])
  );

  async function toggleSound(value) {
    const next = { ...settings, soundEnabled: value };
    setSettings(next);
    await updateSettings({ soundEnabled: value });
  }

  async function pickDifficulty(id) {
    const next = { ...settings, defaultDifficulty: id };
    setSettings(next);
    await updateSettings({ defaultDifficulty: id });
  }

  function handleClearAll() {
    Alert.alert(
      "Clear All Data",
      "Are you sure you want to delete all local sign progress?",
      [
        { text: "Keep", style: "cancel" },
        {
          text: "Clear",
          style: "destructive",
          onPress: async () => {
            const fresh = await clearAllData();
            setSettings(fresh?.settings ?? createDefaultAppData().settings);
          }
        }
      ]
    );
  }

  const soundEnabled = settings?.soundEnabled ?? true;
  const defaultDifficulty = settings?.defaultDifficulty ?? "easy";

  return (
    <ScreenContainer>
      <Text style={[styles.title, { color: colors?.text ?? "#2E3440" }]}>
        Parent Settings
      </Text>

      {/* Sound */}
      <Text style={[styles.section, { color: colors?.text ?? "#2E3440" }]}>
        Sound
      </Text>
      <View
        style={[
          styles.row,
          {
            backgroundColor: colors?.card ?? "#FFFFFF",
            borderColor: colors?.border ?? "#F1E3C8"
          }
        ]}
      >
        <Text style={[styles.rowLabel, { color: colors?.text ?? "#2E3440" }]}>
          {soundEnabled ? "On" : "Off"}
        </Text>
        <Switch
          value={soundEnabled}
          onValueChange={toggleSound}
          trackColor={{
            true: colors?.primary ?? "#5FA777",
            false: colors?.border ?? "#F1E3C8"
          }}
          thumbColor={"#FFFFFF"}
        />
      </View>
      <Text style={[styles.hint, { color: colors?.mutedText ?? "#7B8794" }]}>
        Gentle correct-answer sounds can be turned off anytime.
      </Text>

      {/* Default difficulty */}
      <Text style={[styles.section, { color: colors?.text ?? "#2E3440" }]}>
        Default Difficulty
      </Text>
      <View style={styles.chipRow}>
        {DIFFICULTIES.map((d) => (
          <DifficultyChip
            key={d.id}
            label={d.label}
            selected={defaultDifficulty === d.id}
            onPress={() => pickDifficulty(d.id)}
          />
        ))}
      </View>

      {/* Theme */}
      <Text style={[styles.section, { color: colors?.text ?? "#2E3440" }]}>
        Theme
      </Text>
      <Text style={[styles.hint, { color: colors?.mutedText ?? "#7B8794" }]}>
        Mini Traffic Signs uses a bright but calm light theme.
      </Text>

      {/* Notes */}
      <Text style={[styles.section, { color: colors?.text ?? "#2E3440" }]}>
        About this app
      </Text>
      <Note>
        This app is a simple learning activity and does not replace adult
        supervision near roads.
      </Note>
      <Note>
        The app avoids accidents, scary traffic scenes, sirens, police scenes,
        danger scenes, and realistic road situations.
      </Note>
      <Note>
        Mini Traffic Signs does not collect personal data. The app works offline
        and stores statistics, progress, and settings only on this device.
      </Note>
      <Note>
        There are no ads, purchases, accounts, internet access, social sharing,
        leaderboards, or real progress rewards beyond friendly badges.
      </Note>

      <AppButton
        label="Clear All Data"
        variant="danger"
        onPress={handleClearAll}
      />
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
    marginBottom: 8
  },
  section: {
    fontSize: 20,
    fontWeight: "800",
    marginTop: 18,
    marginBottom: 8
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 18,
    borderWidth: 2,
    paddingHorizontal: 18,
    paddingVertical: 14
  },
  rowLabel: {
    fontSize: 18,
    fontWeight: "700"
  },
  hint: {
    fontSize: 15,
    marginTop: 8
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  note: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 14,
    marginVertical: 6
  },
  noteText: {
    fontSize: 15,
    lineHeight: 21
  }
});
