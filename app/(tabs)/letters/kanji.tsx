import { Stack } from "expo-router";

import { Text, View } from "react-native";

export default function Units() {
    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />
            <View className="flex-1 bg-background">
                <Text>Un</Text>
            </View>
        </>
    );
}
