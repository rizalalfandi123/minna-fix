import { useFonts } from "expo-font";

export function useLoadFonts() {
  const [fontsLoadedJp, errorJp] = useFonts({
    "NotoSansJP-Regular": require("../assets/fonts/noto-sans-jp/NotoSansJP-Regular.ttf"),
    "NotoSansJP-Medium": require("../assets/fonts/noto-sans-jp/NotoSansJP-Medium.ttf"),
    "NotoSansJP-Bold": require("../assets/fonts/noto-sans-jp/NotoSansJP-Bold.ttf"),
    "NotoSansJP-SemiBold": require("../assets/fonts/noto-sans-jp/NotoSansJP-SemiBold.ttf"),
  });

  const fontsReady = fontsLoadedJp;

  const hasError = !!errorJp;

  return { fontsReady, hasError };
}
