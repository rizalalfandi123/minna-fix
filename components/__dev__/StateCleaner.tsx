import { View } from "react-native";
import { Button } from "../ui/button";
import { Text } from "../ui/text";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQueryClient } from "@tanstack/react-query";

const StateCleaner = () => {

  const queryClient = useQueryClient()

  const handleCLean = async () => {
    await AsyncStorage.clear();
  };

  const handleRefetch = () => {
    queryClient.invalidateQueries()
  }

  return (
    <View className="py-8 px-4 flex-col gap-4">
      <Button onPress={handleCLean}>
        <Text>Clean</Text>
      </Button>

      <Button onPress={handleRefetch}>
        <Text>Refetch</Text>
      </Button>
    </View>
  );
};

export default StateCleaner;
