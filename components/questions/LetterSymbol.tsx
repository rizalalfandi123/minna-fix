import React from "react";
import Sound from "../icons/Sound";
import { useButtonScaleAnimation } from "~/hooks/useButtonScaleAnimation";
import { AnimatedPressable } from "../Animations";
import { triggerHaptic } from "~/helpers/triggerHaptic";
import speak from "~/helpers/speak";
import { Text } from "../ui/text";
import { useScreenMode } from "~/lib/useColorScheme";

const LetterSymbol: React.FunctionComponent<{ symbol: string; withHint?: boolean }> = ({ symbol, withHint = true }) => {
  const { themeValue } = useScreenMode();

  const scaleAnimation = useButtonScaleAnimation();

  const handlePress = () => {
    if (!withHint) {
      return;
    }

    triggerHaptic();

    scaleAnimation.animate();

    speak(symbol, "ja", { rate: 0.8 });
  };

  return (
    <AnimatedPressable
      onPress={handlePress}
      style={[scaleAnimation.animatedStyle]}
      className="relative h-44 w-44 items-center justify-center rounded-2xl bg-accent/50 border-2 border-border"
    >
      <Text className="font-sans-bold text-8xl text-accent-foreground">{symbol}</Text>

      {withHint && (
        <Sound style={{ position: "absolute", bottom: 8, left: 8, opacity: 0.8 }} color={themeValue.colors["accent-foreground"]} width={20} height={20} />
      )}
    </AnimatedPressable>
  );
};

export default LetterSymbol;
