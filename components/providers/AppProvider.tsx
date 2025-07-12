import React from "react";
import { View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { maxContentWidth } from "~/lib/constants/sizes";
import ServiceProvider from "./ServiceProvider";
import { useScreenMode } from "~/lib/useScreenMode";
import { vars } from "nativewind";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import useInitLanguage from "~/hooks/useInitLanguage";

const ThemedApp: React.FC<React.PropsWithChildren> = ({ children }) => {
  useInitLanguage();

  const { colorVars } = useScreenMode();

  return (
    <GestureHandlerRootView>
      <SafeAreaProvider style={vars(colorVars)}>
        <SafeAreaView className="bg-background flex-1 items-center justify-center">
          <View className="h-full w-full bg-background" style={{ maxWidth: maxContentWidth }}>
            {children}
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

const AppProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <ServiceProvider>
      <ThemedApp>{children}</ThemedApp>
    </ServiceProvider>
  );
};

export default AppProvider;
