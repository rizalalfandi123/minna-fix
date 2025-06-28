import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import SelectLanguage from "~/components/SelectLanguage";
import DarkModeToggle from "~/components/ThemeToggle";
import { Text } from "~/components/ui/text";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "~/components/ui/button";

const clearAsyncStorage = async() => {
    AsyncStorage.clear();
}

export default function Home() {
  const { t } = useTranslation();

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View className="flex-1 bg-background px-2 py-4">
        <View className="w-full py-4 mb-4">
          <Text className="text-2xl">{t("settings.name")}</Text>

          <Text>{t("settings.desc")}</Text>
        </View>

        <View className="flex-col gap-4">
          <View className="w-full border border-border rounded-xl p-4">
            <Text className="text-xl mb-3">{t("settings.appearance")}</Text>

            <View className="flex-row items-center justify-between">
              <Text>{t("settings.dark_mode")}</Text>
              <DarkModeToggle />
            </View>
          </View>

          <View className="w-full border border-border rounded-xl p-4">
            <Text className="text-xl mb-3">{t("settings.system")}</Text>

            <View className="flex-col gap-2">
              <Text>{t("language")}</Text>
              <SelectLanguage />
            </View>
          </View>
        </View>

        <Button onPress={clearAsyncStorage}>
          <Text>Clear</Text>
        </Button>
      </View>
    </>
  );
}
