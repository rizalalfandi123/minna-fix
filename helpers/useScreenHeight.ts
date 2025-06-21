import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Dimensions } from "react-native";
import { isWeb } from "./platform";

const useScreenHeight = () => {
  const insets = useSafeAreaInsets();

  const screenHeight = isWeb ? Dimensions.get("window").height : Dimensions.get("screen").height;

  const height = screenHeight - insets.top - insets.bottom;

  return height;
};

export default useScreenHeight;
