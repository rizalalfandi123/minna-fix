import "~/global.css";
import "~/libs/i18n";
import { ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { useScreenMode } from "~/lib/useColorScheme";
import { PortalHost } from "@rn-primitives/portal";
import { useLoadFonts } from "~/hooks/useLoadFont";
import * as SplashScreen from "expo-splash-screen";
import AppProvider from "~/components/providers/AppProvider";

export { ErrorBoundary } from "expo-router";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { fontsReady, hasError } = useLoadFonts();

  React.useEffect(() => {
    if (fontsReady || hasError) {
      SplashScreen.hideAsync();
    }
  }, [fontsReady, hasError]);

  if (!fontsReady && !hasError) return null;

  return (
    <AppProvider>
      <App />
    </AppProvider>
  );
}

const App = () => {
  const { screenMode, applyScreenMode, themeValue } = useScreenMode();

  React.useEffect(() => {
    applyScreenMode(screenMode);
  }, [screenMode]);

  return (
    <ThemeProvider value={themeValue.theme}>
      <StatusBar style={screenMode} />
      <Stack
        screenOptions={{
          presentation: "transparentModal",
          headerShown: false,
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="learn" />
      </Stack>
      <PortalHost />
    </ThemeProvider>
  );
};
