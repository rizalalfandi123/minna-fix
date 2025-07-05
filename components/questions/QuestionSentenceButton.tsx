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
import { useGetWord } from "~/services/queries/wordQueries";
import { useTranslation } from "react-i18next";
import { Language } from "~/contexts/userContext";

export type QuestionSentenceButtonProps = {
  sentence: Array<{ key: string }>;
  withHint: boolean;
  withSpeak?: boolean;
  translateAsValue?: boolean;
};

const QuestionSentenceButton: React.FunctionComponent<QuestionSentenceButtonProps> = ({ sentence, withHint, withSpeak = true, translateAsValue = false }) => {
  const { colors } = useScreenMode();

  const scaleAnimation = useButtonScaleAnimation();

  const handleSound = () => {
    scaleAnimation.animate();

    triggerHaptic();

    speak(sentence.map((item) => item.key).join(" "), "ja");
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
          <Hint translateAsValue={translateAsValue} key={index} id={item.key} />
        ))}
      </View>
    </View>
  );
};

const Hint: React.FunctionComponent<{ id: string; translateAsValue: boolean }> = ({ id, translateAsValue }) => {
  const { i18n } = useTranslation();

  const activeLang = i18n.language as Language;

  const { data } = useGetWord(id);

  const { hintData, word } = React.useMemo(() => {
    const result: Array<string> = [id];

    let word: string = id;

    if (data?.[activeLang]) {
      result.push(data[activeLang]);
    }

    result.push(...Object.values(data?.others ?? {}));

    if (translateAsValue && data) {
      word = data[activeLang];
    }

    return { hintData: result, word };
  }, [data, translateAsValue]);

  return <Word hintData={hintData} word={word} withHint />;
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
