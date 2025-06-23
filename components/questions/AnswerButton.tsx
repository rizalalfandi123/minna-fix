import React from "react";
import { View } from "react-native";
import { AnswerStatus } from "~/types";
import { Easing, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { AnimatedView } from "../Animations";
import useAnswerSound from "~/hooks/useAnswerSound";
import { Button, ButtonProps } from "../ui/button";
import { Text } from "../ui/text";
import { contentWidth } from "~/lib/constants/sizes";
import { cn } from "~/lib/utils";
import { useTranslation } from "react-i18next";

export type AnswerButtonProps = {
  answerStatus: AnswerStatus;
} & Partial<ButtonProps>;

const height = 280;

const AnswerButton: React.FunctionComponent<AnswerButtonProps> = ({ answerStatus, ...props }) => {

  const {t} = useTranslation()

  const answerSound = useAnswerSound();

  const playAudio = async (type: AnswerStatus) => {
    if (type === null) return;

    answerSound.play(type);
  };

  const translateY = useSharedValue<number>(height);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(translateY.value, {
            duration: 400,
            easing: Easing.out(Easing.ease),
          }),
        },
      ],
    };
  });

  const toggleExpand = () => {
    translateY.value = answerStatus === null ? height : 0;
  };

  React.useEffect(() => {
    playAudio(answerStatus);
    toggleExpand();
  }, [answerStatus]);

  return (
    <View className="relative z-10 h-24 w-full items-center justify-center">
      <View className="z-20 w-full px-4">
        <Button size="lg" className="w-full" {...props}>
          <Text>{answerStatus === null ? t('check') : t('continue')}</Text>
        </Button>
      </View>

      <AnimatedView
        style={[animatedStyle, { height: 280, width: contentWidth }]}
        className={cn("absolute bottom-0 left-0 border-border bg-background p-2 pb-24", answerStatus === null ? "border-t-0" : "border-t-2")}
      >
        <Text>{answerStatus}</Text>
      </AnimatedView>
    </View>
  );
};

export default AnswerButton;
