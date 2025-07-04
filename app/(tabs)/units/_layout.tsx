import { Stack } from "expo-router";

export default function LearnLayout() {
  return (
    <Stack screenOptions={{ presentation: "transparentModal", headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="[id]" />
    </Stack>
  );
}
