import { Dimensions } from "react-native";

export const maxContentWidth = 512;

export const day = 1000 * 60 * 60 * 24;

export const letterGridColumnCount = 5;

export const contentWidth = Math.min(Dimensions.get("window").width, maxContentWidth);

export const learnProgressBarHeight = 14 * 4;

export const bottomNavHeight = 64;

export const pageHeaderHeight = 56;

export const windowHeight = Dimensions.get("screen").height;

export const letterHeight = windowHeight - bottomNavHeight * 2;

export const learnUnitHeight = windowHeight - bottomNavHeight * 2 - pageHeaderHeight;
