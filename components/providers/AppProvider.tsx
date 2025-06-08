import React from "react";
import { View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { maxContentWidth } from "~/lib/constants/sizes";
import ServiceProvider from "./ServiceProvider";
import { UserDataProvider } from "~/contexts/userContext";

const AppProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <ServiceProvider>
      <UserDataProvider>
        <SafeAreaProvider>
          <SafeAreaView className="bg-background flex-1 items-center justify-center">
            <View
              className="h-full w-full"
              style={{ maxWidth: maxContentWidth }}
            >
              {children}
            </View>
          </SafeAreaView>
        </SafeAreaProvider>
      </UserDataProvider>
    </ServiceProvider>
  );
};

export default AppProvider;
