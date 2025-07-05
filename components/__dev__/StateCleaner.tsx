import { View } from "react-native";
import { Button } from "../ui/button";
import { Text } from "../ui/text";
import AsyncStorage from "@react-native-async-storage/async-storage";

const StateCleaner = () => {
  const handleCLean = async () => {
    await AsyncStorage.clear();
  };

  return (
    <View className="py-8 px-4">
      <Button onPress={handleCLean}>
        <Text>Clean</Text>
      </Button>
    </View>
  );
};

export default StateCleaner;
