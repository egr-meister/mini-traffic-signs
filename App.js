import React, { useEffect } from "react";
import { registerRootComponent } from "expo";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SystemBars } from "react-native-edge-to-edge";

import AppNavigator from "./src/navigation/AppNavigator";
import { enableStickyImmersiveMode } from "./src/utils/immersiveHelpers";

function App() {
  useEffect(() => {
    // Hide system bars for a calm, child-friendly fullscreen experience.
    enableStickyImmersiveMode();
  }, []);

  return (
    <SafeAreaProvider>
      {/* Hidden system bars; they reappear briefly only after an edge swipe. */}
      <SystemBars hidden={true} style="dark" />
      <AppNavigator />
    </SafeAreaProvider>
  );
}

export default App;

// App.js is the entry point (see "main" in package.json).
registerRootComponent(App);
