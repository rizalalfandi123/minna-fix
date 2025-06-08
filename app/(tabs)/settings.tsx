import { Stack } from "expo-router";

import { View } from "react-native";
import { ThemeToggle } from "~/components/ThemeToggle";

export default function Home() {
    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />
            <View className="flex-1 bg-background">
                <ThemeToggle/>
            </View>
        </>
    );
}
