import React, { useEffect } from "react";
import { Text, StyleSheet } from "react-native";

import ScreenContainer from "../components/ScreenContainer";
import TrafficSignCard from "../components/TrafficSignCard";
import AppButton from "../components/AppButton";
import EmptyState from "../components/EmptyState";
import colors from "../theme/colors";

import { getAllSigns } from "../data/signItems";
import { markSignLearned } from "../storage/appStorage";
import { disableKeepAwakeSafely } from "../utils/immersiveHelpers";

export default function SignCardsScreen({ navigation }) {
  const signs = getAllSigns();

  useEffect(() => {
    // Static learning screen: do not keep the device awake here.
    disableKeepAwakeSafely();
    // Exploring the sign cards counts as learning each shown sign.
    signs.forEach((sign) => {
      if (sign?.id) {
        markSignLearned(sign.id);
      }
    });
  }, []);

  return (
    <ScreenContainer>
      <Text style={[styles.title, { color: colors?.text ?? "#2E3440" }]}>
        Sign Cards
      </Text>
      <Text style={[styles.subtitle, { color: colors?.mutedText ?? "#7B8794" }]}>
        Look at each friendly sign and its safe action.
      </Text>

      {signs.length === 0 ? (
        <EmptyState
          emoji="🚦"
          title="No signs to show yet"
          message="Come back soon for friendly signs."
        />
      ) : (
        signs.map((sign) => <TrafficSignCard key={sign.id} sign={sign} />)
      )}

      <AppButton
        label="Play"
        variant="primary"
        onPress={() => navigation.navigate("GamePicker")}
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
    marginTop: 6
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 6,
    marginBottom: 12
  }
});
