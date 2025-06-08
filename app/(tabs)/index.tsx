import { Stack } from "expo-router";

import { View } from "react-native";
import { Text } from "~/components/ui/text";

export default function Home() {
    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />
            <View className="flex-1 bg-background">
                <Text>test</Text>
            </View>
        </>
    );
}
