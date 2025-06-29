import React from "react";
import { Platform } from "react-native";
import { ScreenMode } from "~/contexts/userContext";
import useUserData from "~/hooks/useUserData";
import { setAndroidNavigationBar } from "./android-navigation-bar";
import { useColorScheme } from "nativewind";
import appTheme from "./constants/appTheme";
import { Theme } from "@react-navigation/native";

const fonts: Theme["fonts"] = {
  regular: {
    fontFamily: '"NotoSansJP-Regular", system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    fontWeight: "400",
  },
  medium: {
    fontFamily: '"NotoSansJP-Medium", system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    fontWeight: "500",
  },
  bold: {
    fontFamily: '"NotoSansJP-SemiBold", system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    fontWeight: "600",
  },
  heavy: {
    fontFamily: '"NotoSansJP-Bold", system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    fontWeight: "700",
  },
};

export const setPlatformSpecificSetup = Platform.select({
  web: (screenMode: ScreenMode) => {
    document.documentElement.classList.add("bg-background");

    if (screenMode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  },
  android: (screenMode: ScreenMode) => {
    setAndroidNavigationBar(screenMode);
  },
  default: () => {},
});

export function useScreenMode() {
  const { state, dispatch } = useUserData();

  const { setColorScheme } = useColorScheme();

  const screenMode = state.settings.screenMode;

  const colorVars = React.useMemo(() => {
    const colorData = Object.entries(appTheme["default"][screenMode]).map(([key, value]) => ({
      [key]: value,
    }));

    const data: Record<keyof typeof appTheme.default.dark, string> = Object.assign({}, ...colorData);

    return data;
  }, [screenMode]);

  const colors = React.useMemo(() => {

    const data = Object.fromEntries(Object.entries(colorVars).map(([key, value]) => [key, `hsl(${value})`]))  as unknown as Record<keyof typeof appTheme.default.dark, string>

    return data
  }, [colorVars]);

  const toggleScreenMode = () => {
    setScreenMode(state.settings.screenMode === "light" ? "dark" : "light");
  };

  const setScreenMode = (screenMode: ScreenMode) => {
    dispatch({
      type: "SET_SCREEN_MODE",
      payload: screenMode,
    });
  };

  const applyScreenMode = (screenMode: ScreenMode) => {
    setColorScheme(screenMode);

    setPlatformSpecificSetup(screenMode);
  };

  return {
    screenMode,
    isDarkScreenMode: screenMode === "dark",
    setScreenMode,
    toggleScreenMode,
    applyScreenMode,
    colors,
    fonts,
    colorVars
  };
}
