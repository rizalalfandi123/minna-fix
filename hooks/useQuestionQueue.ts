import React from "react";
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { contentWidth } from "~/lib/constants/sizes";

export type TUseQuestionArgs<T> = {
  questions: Array<T>;
  onQuestionFinish: (id: T) => void;
  onCorrectAnswer?: (id: T) => void;
  onErrorAnswer?: (id: T) => void;
};

export function useQuestionQuene<T>({
  questions,
  ...props
}: TUseQuestionArgs<T>) {
  const [questionQueue, setQuestionQueue] = React.useState<
    Array<{ question: T; isActive: boolean }>
  >(() => questions.map((question) => ({ question, isActive: true })));

  const [activeQuestionIndex, setActiveQuestionIndex] =
    React.useState<number>(0);

  const translateX = useSharedValue<number>(0);

  const handleSetActiveQuestion = (index: number) => {
    translateX.value = withTiming(-contentWidth * index, { duration: 500 });

    setActiveQuestionIndex(index);
  };

  const handleSkipQuestion = () => {
    setQuestionQueue((prev) => {
      const nextData = prev.map((item, i) =>
        i !== activeQuestionIndex ? item : { ...item, isActive: false }
      );

      nextData.push({
        question: prev[activeQuestionIndex].question,
        isActive: true,
      });

      return nextData;
    });

    handleSetActiveQuestion(activeQuestionIndex + 1);
  };

  const handleNextQuestion = (nextIndex: number) => {
    setQuestionQueue((prev) =>
      prev.map((item, index) =>
        index !== activeQuestionIndex ? item : { ...item, isActive: false }
      )
    );

    if (questionQueue[nextIndex]) {
      handleSetActiveQuestion(nextIndex);
    }
  };

  const handleSuccessQuestion = () => {
    const isActiveQuestionExist = questionQueue
      .filter((_, i) => i !== activeQuestionIndex)
      .some((item) => item.isActive);

    if (isActiveQuestionExist) {
      props.onCorrectAnswer?.(questionQueue[activeQuestionIndex].question);

      handleNextQuestion(activeQuestionIndex + 1);
    } else {
      props.onQuestionFinish(questionQueue[activeQuestionIndex].question);
    }
  };

  const handleErrorQuestion = () => {
    props.onErrorAnswer?.(questionQueue[activeQuestionIndex].question);

    handleSkipQuestion();
  };

  const containerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return {
    questionQueue,
    activeQuestionIndex,
    handleSetActiveQuestion,
    handleSkipQuestion,
    handleSuccessQuestion,
    handleErrorQuestion,
    containerStyle,
  };
}
