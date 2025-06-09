import React from "react";
import { View } from "react-native";
import speak from "~/helpers/speak";
import Sound from "../icons/Sound";
import { AnimatedPressable } from "../Animations";
import { useButtonScaleAnimation } from "~/hooks/useButtonScaleAnimation";
import { triggerHaptic } from "~/helpers/triggerHaptic";
import { cn } from "~/lib/utils";
import { Text } from "~/components/ui/text";
import { useScreenMode } from "~/lib/useColorScheme";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";

const QuestionSentenceButton: React.FunctionComponent<{
  sentence: Array<{ word: string; hintData?: Array<string> }>;
  withHint?: boolean;
  withSpeak?: boolean;
}> = ({ sentence, withHint = true, withSpeak = true }) => {
  const { colors } = useScreenMode();

  const scaleAnimation = useButtonScaleAnimation();

  const handleSound = () => {
    scaleAnimation.animate();

    triggerHaptic();

    speak(sentence.map((item) => item.word).join(" "), "ja");
  };

  return (
    <View
      className={cn("w-full flex-row justify-center gap-4", {
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

      {sentence.map((item, index) => (
        <Word key={index} hintData={item.hintData || []} word={item.word} withHint={withHint} />
      ))}
    </View>
  );
};

const Word: React.FunctionComponent<{
  hintData: Array<string>;
  word: string;
  withHint: boolean;
}> = ({ hintData, word, withHint }) => {
  const text = (
    <View className="h-16 min-w-[2rem] flex-col items-center justify-center">
      <Text
        style={{
          borderBottomWidth: withHint ? 2 : 0,
        }}
        className="font-sans-bold text-2xl"
      >
        {word}
      </Text>

      <View className="h-2 w-full !border-b-4 border-accent border-dotted bg-background" />
    </View>
  );

  return (
    <React.Fragment>
      {hintData ? (
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
        // <Popover size="$5" allowFlip stayInFrame offset={15} resize>
        //   <Popover.Trigger asChild>{text}</Popover.Trigger>

        //   <Popover.Content
        //     enterStyle={{ y: -10, opacity: 0 }}
        //     exitStyle={{ y: -10, opacity: 0 }}
        //     elevate
        //     animation={[
        //       'quick',
        //       {
        //         opacity: {
        //           overshootClamping: true,
        //         },
        //       },
        //     ]}
        //     style={{
        //       backgroundColor: getTokenValue('$color.slate-700'),
        //     }}
        //     p="$3">
        //     <Popover.Arrow
        //       style={{
        //         backgroundColor: getTokenValue('$color.slate-700'),
        //       }}
        //     />

        //     <YStack width="100%">
        //       {hintData.map((data, i) => (
        //         <View
        //           key={data}
        //           borderBottomWidth={i !== hintData.length - 1 ? 2 : 0}
        //           borderColor="white"
        //           p="$2">
        //           <BodyText fontSize="$6">{data}</BodyText>
        //         </View>
        //       ))}
        //     </YStack>
        //   </Popover.Content>
        // </Popover>
        text
      )}
    </React.Fragment>
  );
};

export default QuestionSentenceButton;
