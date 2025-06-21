import React from "react";
import { Letter } from "~/services/queries/letterQueries";
import { View } from "react-native";
import { Nullable } from "~/types";
import ProgressBar from "~/components/ProgressBar";
import { useButtonScaleAnimation } from "~/hooks/useButtonScaleAnimation";
import { triggerHaptic } from "~/helpers/triggerHaptic";
import speak from "~/helpers/speak";
import { AnimatedPressable } from "../Animations";
import { Text } from "../ui/text";
import { cn } from "~/lib/utils";
import { useButtonLetterProgress } from "~/hooks/useButtonLetterProgress";

const LetterButton: React.FunctionComponent<{
  data: Nullable<Letter>;
  symbolClassName?: string;
}> = ({ data, symbolClassName }) => {
  const scaleAnimation = useButtonScaleAnimation();

  const { progress } = useButtonLetterProgress({ letterId: data?.id });

  const handlePress = () => {
    scaleAnimation.animate();

    triggerHaptic();

    speak(data?.symbol ?? "", "ja", { rate: 0.8 });
  };

  if (!data) {
    return <View className="h-full w-full rounded-lg bg-muted/20" />;
  }

  return (
    <AnimatedPressable
      onPress={handlePress}
      style={scaleAnimation.animatedStyle}
      className="h-full w-full flex-col items-center rounded-lg border-2 border-border bg-muted/50 py-2"
    >
      <Text className={cn("mb-1 font-sans-semibold text-3xl", symbolClassName)}>{data.symbol}</Text>
      <Text className="font-sans-medium">{data.name}</Text>
      <View className="w-full flex-1 items-center justify-center px-1">
        <ProgressBar containerClassName="h-2.5" progress={progress} />
      </View>
    </AnimatedPressable>
  );
};

const MemoizedLetterButton = React.memo(LetterButton);

export default MemoizedLetterButton;
