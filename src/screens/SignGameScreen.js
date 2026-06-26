import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import ScreenContainer from "../components/ScreenContainer";
import SituationCard from "../components/SituationCard";
import AnswerCard from "../components/AnswerCard";
import AppButton from "../components/AppButton";
import colors from "../theme/colors";

import {
  buildSignQuestion,
  getGameModeLabel,
  isCorrectAnswer,
  GAME_MODES
} from "../utils/signGameHelpers";
import { recordLearningAnswer, loadAppData } from "../storage/appStorage";
import { playCorrectSoundIfEnabled } from "../utils/soundHelpers";
import {
  activateGameKeepAwake,
  deactivateGameKeepAwake
} from "../utils/immersiveHelpers";

const ENCOURAGEMENTS = [
  "Take your time.",
  "Look carefully.",
  "Choose the friendly action."
];

const DIFFICULTY_LABELS = {
  easy: "Easy",
  medium: "Medium",
  hard: "Hard"
};

export default function SignGameScreen({ route, navigation }) {
  const gameMode = route?.params?.gameMode ?? GAME_MODES.FIND_SIGN;
  const difficulty = route?.params?.difficulty ?? "easy";

  const [question, setQuestion] = useState(() =>
    buildSignQuestion(gameMode, difficulty)
  );
  const [selectedId, setSelectedId] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [wasCorrect, setWasCorrect] = useState(false);
  const [encouragement, setEncouragement] = useState(ENCOURAGEMENTS[0]);
  const [settings, setSettings] = useState({ soundEnabled: true });

  // Keep awake ONLY while this game screen is focused.
  useFocusEffect(
    useCallback(() => {
      activateGameKeepAwake();
      return () => {
        deactivateGameKeepAwake();
      };
    }, [])
  );

  useEffect(() => {
    let active = true;
    loadAppData().then((data) => {
      if (active) {
        setSettings(data?.settings ?? { soundEnabled: true });
      }
    });
    return () => {
      active = false;
    };
  }, []);

  function pickEncouragement() {
    const idx = Math.floor(Math.random() * ENCOURAGEMENTS.length);
    setEncouragement(ENCOURAGEMENTS[idx] ?? ENCOURAGEMENTS[0]);
  }

  function handleAnswer(choiceId) {
    if (answered) {
      return;
    }
    const correct = isCorrectAnswer(choiceId, question?.correctAnswerId);
    setSelectedId(choiceId);
    setAnswered(true);
    setWasCorrect(correct);

    if (correct) {
      playCorrectSoundIfEnabled(settings);
    }

    // Save stat + progress. Safe if storage is empty.
    recordLearningAnswer(gameMode, question?.signId, correct);
  }

  function handleNext() {
    setSelectedId(null);
    setAnswered(false);
    setWasCorrect(false);
    pickEncouragement();
    setQuestion(buildSignQuestion(gameMode, difficulty));
  }

  const choices = question?.choices ?? [];
  const bigChoices = difficulty === "easy";
  const visualEmoji =
    gameMode === GAME_MODES.SAFE_ACTION
      ? question?.situationEmoji ?? question?.correctEmoji ?? "🚦"
      : "🔎";

  function stateForChoice(choice) {
    if (!answered) {
      return "idle";
    }
    if (choice?.id === question?.correctAnswerId) {
      return "correct";
    }
    if (choice?.id === selectedId) {
      return "wrong";
    }
    return "idle";
  }

  return (
    <ScreenContainer>
      <View style={styles.metaRow}>
        <Text style={[styles.meta, { color: colors?.mutedText ?? "#7B8794" }]}>
          {getGameModeLabel(gameMode)}
        </Text>
        <Text style={[styles.meta, { color: colors?.mutedText ?? "#7B8794" }]}>
          {DIFFICULTY_LABELS[difficulty] ?? "Easy"}
        </Text>
      </View>

      <SituationCard
        prompt={question?.prompt ?? "Look carefully."}
        emoji={visualEmoji}
        encouragement={answered ? null : encouragement}
      />

      {choices.length === 0 ? (
        <Text style={[styles.meta, { textAlign: "center" }]}>
          Getting a friendly question ready...
        </Text>
      ) : (
        choices.map((choice) => (
          <AnswerCard
            key={choice.id}
            label={choice.label}
            emoji={choice.emoji}
            big={bigChoices}
            state={stateForChoice(choice)}
            disabled={answered}
            onPress={() => handleAnswer(choice.id)}
          />
        ))
      )}

      {answered ? (
        <View
          style={[
            styles.feedback,
            {
              backgroundColor: wasCorrect ? "#E8F6EE" : "#FBF3E6",
              borderColor: wasCorrect
                ? colors?.success ?? "#52B788"
                : colors?.accent ?? "#FFD166"
            }
          ]}
        >
          <Text style={[styles.feedbackText, { color: colors?.text ?? "#2E3440" }]}>
            {wasCorrect
              ? "Great choice!"
              : "Good try. The answer was: " + (question?.correctLabel ?? "") + "."}
          </Text>
        </View>
      ) : null}

      {answered ? (
        <AppButton label="Next" variant="primary" onPress={handleNext} />
      ) : null}

      <AppButton
        label="Back"
        variant="soft"
        onPress={() => navigation.navigate("GamePicker")}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8
  },
  meta: {
    fontSize: 15,
    fontWeight: "700"
  },
  feedback: {
    borderRadius: 20,
    borderWidth: 2,
    padding: 18,
    marginVertical: 10
  },
  feedbackText: {
    fontSize: 20,
    fontWeight: "800",
    textAlign: "center"
  }
});
