import { KeyboardAvoidingView, View } from "react-native";
import { Input } from "~/components/ui/input";
import React from "react";
import * as wanakana from "wanakana";
import { Text } from "~/components/ui/text";
import { AnswerStatus } from "~/types";
import { cn } from "~/lib/utils";
import useKeyboardVisibility from "~/hooks/useKeyboardVisibility";
import { learnProgressBarHeight } from "~/lib/constants/sizes";
import useScreenHeight from "~/helpers/useScreenHeight";
import useLearnUnitStore from "~/stores/learnUnitStore";
import { isWriteQuestion } from "~/helpers/unitQuestionNarrowing";

export type WriteTheSymbolProps = {
  data: {
    answer: string;
  };
  renderQuestion: (props: Pick<WriteTheSymbolProps, "data">) => React.ReactNode;
};

const WriteTheSymbol: React.FC<WriteTheSymbolProps> = (props) => {
  const { screenHeight } = useScreenHeight();

  const [inputValue, setInputValue] = React.useState<string>("");

  const handleCheckAnserStatus = useLearnUnitStore((state) => state.handleCheckAnserStatus);

  const inputAnswer = useLearnUnitStore((state) => {
    if (isWriteQuestion(state.data.activeQuestionData.data)) {
      return state.data.activeQuestionData.data.inputAnswer;
    }

    return "";
  });

  const setSelectedAnswer = useLearnUnitStore((state) => state.setActiveQuestionData);

  // const [kanaValue, setKanaValue] = React.useState<string>("");

  // const [answerStatus, setAnswerStatus] = React.useState<AnswerStatus>(null);

  const { isVisible: isVisibleKeyboard, height: keyboardHeight } = useKeyboardVisibility();

  const questionHeight = React.useMemo<number>(() => {
    return screenHeight - learnProgressBarHeight - 96 - 20 - (isVisibleKeyboard ? keyboardHeight : 0);
  }, [isVisibleKeyboard, keyboardHeight]);

  const onChangeText = (text: string) => {
    setInputValue(text);

    React.startTransition(() => {
      setSelectedAnswer({ type: "WRITE_THE_SYMBOL_FROM_SOUND", answer: props.data.answer, inputAnswer: wanakana.toKana(text) });
      // setKanaValue(wanakana.toKana(text));
    });
  };

  // const handleResetAnswer = () => {
  //   setInputValue("");
  //   // setKanaValue("");
  //   // setAnswerStatus(null);
  // };

  // const handleContinue = () => {
  //   if (answerStatus === "success") {
  //     props.onCorrectAnswer?.();
  //   } else {
  //     props.onErrorAnswer?.();
  //   }

  //   handleResetAnswer();
  // };

  // const handleCheckAnswer = () => {
  //   if (!kanaValue) return;

  //   const isCorrect = kanaValue.trim() === props.data.answer;

  //   setAnswerStatus(isCorrect ? "success" : "error");
  // };

  // const handleNext = () => {
  //   if (answerStatus === null) {
  //     handleCheckAnswer();
  //   } else {
  //     handleContinue();
  //   }
  // };

  return (
    <KeyboardAvoidingView behavior="padding" className="w-full flex-1">
      <View style={{ height: questionHeight }}>
        <View className="flex-1 justify-center items-center">{props.renderQuestion({ data: props.data })}</View>

        <View className="flex-none">
          <View className="px-2 pb-8">
            <Text className={cn("text-center font-sans-medium text-2xl", { "text-accent": !inputAnswer })}>{inputAnswer || "Your input in kana"}</Text>
          </View>

          <View className="px-4">
            <Input value={inputValue} onChangeText={onChangeText} placeholder="Input here" returnKeyType="done" onSubmitEditing={handleCheckAnserStatus} />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default WriteTheSymbol;
