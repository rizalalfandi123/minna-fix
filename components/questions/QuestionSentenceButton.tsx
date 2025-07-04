import React from "react";
import { View } from "react-native";
import speak from "~/helpers/speak";
import Sound from "../icons/Sound";
import { AnimatedPressable } from "../Animations";
import { useButtonScaleAnimation } from "~/hooks/useButtonScaleAnimation";
import { triggerHaptic } from "~/helpers/triggerHaptic";
import { cn } from "~/lib/utils";
import { Text } from "~/components/ui/text";
import { useScreenMode } from "~/lib/useScreenMode";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";

export type QuestionSentenceButtonProps = {
  sentence: Array<{ word: string; hintData?: Array<string> }>;
  withHint: boolean;
  withSpeak?: boolean;
};

const QuestionSentenceButton: React.FunctionComponent<QuestionSentenceButtonProps> = ({ sentence, withHint, withSpeak = true }) => {
  const { colors } = useScreenMode();

  const scaleAnimation = useButtonScaleAnimation();

  const handleSound = () => {
    scaleAnimation.animate();

    triggerHaptic();

    speak(sentence.map((item) => item.word).join(" "), "ja");
  };

  return (
    <View
      className={cn("w-full justify-center gap-4 flex-col items-center", {
        "cursor-pointer": withHint,
      })}
    >
      {withHint && withSpeak && (
        <AnimatedPressable
          onPress={handleSound}
          style={[scaleAnimation.animatedStyle]}
          className="h-16 w-16 items-center justify-center rounded-xl border bg-accent/50 border-border"
        >
          <Sound color={colors["accent-foreground"]} width={32} height={32} />
        </AnimatedPressable>
      )}

      <View className="flex flex-row flex-wrap gap-2">
        {sentence.map((item, index) => (
          <Word key={index} hintData={item.hintData || []} word={item.word} withHint={withHint} />
        ))}
      </View>
    </View>
  );
};

const Word: React.FunctionComponent<{
  hintData: Array<string>;
  word: string;
  withHint: boolean;
}> = ({ hintData, word, withHint }) => {
  const availableHint = withHint && hintData.length > 0;

  const text = (
    <View className="h-16 min-w-[16px] flex-col items-center justify-center">
      <Text className="font-sans-bold text-2xl">{word}</Text>

      <View className={cn("h-2 w-full border-accent border-dotted bg-background", availableHint ? "border-b-4" : "border-b-0")} />
    </View>
  );

  return (
    <React.Fragment>
      {availableHint ? (
        <Popover>
          <PopoverTrigger>{text}</PopoverTrigger>
          <PopoverContent className="w-fit" side="bottom" sideOffset={-24}>
            {hintData.map((data, i) => (
              <View key={data}>
                <Text className={cn("tracking-wider text-lg border-b border-border py-2 text-center font-sans-semibold", { "border-t": i === 0 })} key={i}>
                  {data}
                </Text>
              </View>
            ))}
          </PopoverContent>
        </Popover>
      ) : (
        text
      )}
    </React.Fragment>
  );
};

export default QuestionSentenceButton;
