import React from "react";

import { Letter } from "~/services/queries/letterQueries";
import { View } from "react-native";
import { Nullable } from "~/types";
import ProgressBar from "~/components/ProgressBar";
// import { useGetLetterLevels } from '~/services/queries/letterLevelQueries';
// import { useGetLetterProgress } from '~/services/queries/letterProgressQueries';
import { useButtonScaleAnimation } from "~/hooks/useButtonScaleAnimation";
import { triggerHaptic } from "~/helpers/triggerHaptic";
import Animated from "react-native-reanimated";
import speak from "~/helpers/speak";
import { AnimatedPressable } from "../Animations";
import { Text } from "../ui/text";
import { cn } from "~/lib/utils";

const LetterButton: React.FunctionComponent<{
  data: Nullable<Letter>;
  symbolClassName?: string;
}> = ({ data, symbolClassName }) => {
  //   const levelData = useGetLetterLevels();

  //   const letterProgress = useGetLetterProgress();

  const scaleAnimation = useButtonScaleAnimation();

  //   const progressData = React.useMemo(() => {
  //     const totalLevel = (levelData.data ?? []).filter((level) =>
  //       level.letters_to_letter_levels.some((letterLevel) => letterLevel.letter_id === data?.id)
  //     );

  //     const totalProgress = (letterProgress.data ?? []).filter(
  //       (progress) =>
  //         totalLevel.some((level) => progress.progress.letter_level_id === level.id) &&
  //         progress.progress.is_completed
  //     );

  //     const percentage = Math.ceil(
  //       (Math.min(totalProgress.length, totalLevel.length) / totalLevel.length) * 100
  //     );

  //     return { totalLevel, totalProgress, percentage };
  //   }, [levelData, letterProgress, data?.id]);

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
        <ProgressBar containerClassName="h-2.5" progress={25} />
      </View>
    </AnimatedPressable>
  );
};

const MemoizedLetterButton = React.memo(LetterButton);

export default MemoizedLetterButton;
