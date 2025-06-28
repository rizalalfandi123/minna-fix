import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Dimensions } from "react-native";
import { isWeb } from "./platform";
import { bottomNavHeight, maxContentWidth, pageHeaderHeight } from "~/lib/constants/sizes";

const useScreenHeight = () => {
  const insets = useSafeAreaInsets();

  const windowHeight = isWeb ? Dimensions.get("window").height : Dimensions.get("screen").height;

  const windowWidth = isWeb ? Dimensions.get("window").width : Dimensions.get("screen").width;

  const screenHeight = windowHeight - insets.top - insets.bottom;

  const letterHeight = windowHeight - bottomNavHeight * 2;

  const learnUnitHeight = windowHeight - bottomNavHeight * 2 - pageHeaderHeight;

  const contentWidth = Math.min(windowWidth, maxContentWidth)

  return { screenHeight, letterHeight, learnUnitHeight, contentWidth };
};

export default useScreenHeight;
