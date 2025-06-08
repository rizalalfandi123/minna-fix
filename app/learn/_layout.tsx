import { Stack } from "expo-router";

export default function LearnLayout() {
    return (
        <Stack screenOptions={{ presentation: "transparentModal", headerShown: false }}>
            {/* <Stack.Screen name="unit" /> */}
            <Stack.Screen name="letters" />
            <Stack.Screen name="vocabulary/[id]" />
        </Stack>
    );
}
