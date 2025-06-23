import React from "react";
import { View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { maxContentWidth } from "~/lib/constants/sizes";
import ServiceProvider from "./ServiceProvider";
import { UserDataProvider } from "~/contexts/userContext";
import { useScreenMode } from "~/lib/useScreenMode";
import { vars } from "nativewind";

const ThemedApp: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { colorVars } = useScreenMode();

  return (
    <SafeAreaProvider style={vars(colorVars)}>
      <SafeAreaView className="bg-background flex-1 items-center justify-center">
        <View className="h-full w-full bg-background" style={{ maxWidth: maxContentWidth }}>
          {children}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const AppProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <ServiceProvider>
      <UserDataProvider>
        <ThemedApp>{children}</ThemedApp>
      </UserDataProvider>
    </ServiceProvider>
  );
};

export default AppProvider;
