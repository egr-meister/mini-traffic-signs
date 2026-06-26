import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import colors from "../theme/colors";

import TrafficHomeScreen from "../screens/TrafficHomeScreen";
import SignCardsScreen from "../screens/SignCardsScreen";
import GamePickerScreen from "../screens/GamePickerScreen";
import SignGameScreen from "../screens/SignGameScreen";
import TrafficStatsScreen from "../screens/TrafficStatsScreen";
import ParentSettingsScreen from "../screens/ParentSettingsScreen";

const Stack = createNativeStackNavigator();

// Always extend DefaultTheme; never build a navigation theme from scratch.
const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors?.background ?? "#FFF8EC",
    card: colors?.card ?? "#FFFFFF",
    primary: colors?.primary ?? "#5FA777",
    text: colors?.text ?? "#2E3440",
    border: colors?.border ?? "#F1E3C8",
    notification: colors?.accent ?? "#FFD166"
  }
};

export default function AppNavigator() {
  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator
        initialRouteName="TrafficHome"
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors?.background ?? "#FFF8EC" },
          animation: "fade"
        }}
      >
        <Stack.Screen name="TrafficHome" component={TrafficHomeScreen} />
        <Stack.Screen name="SignCards" component={SignCardsScreen} />
        <Stack.Screen name="GamePicker" component={GamePickerScreen} />
        <Stack.Screen name="SignGame" component={SignGameScreen} />
        <Stack.Screen name="TrafficStats" component={TrafficStatsScreen} />
        <Stack.Screen name="ParentSettings" component={ParentSettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
