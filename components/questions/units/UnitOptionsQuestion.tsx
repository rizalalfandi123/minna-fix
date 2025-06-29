import React from "react";
import { View } from "react-native";
import useLearnUnitStore from "~/stores/learnUnitStore";
import { isOptionsQuestion } from "~/helpers/unitQuestionNarrowing";
import OptionsQuestion, { OptionsQuestionProps } from "../OptionsQuestion";

export type UnitOptionsQuestionProps = Omit<OptionsQuestionProps, "handleSelectAnswer" | "selectedAnswer" | "isLocked">;

const UnitOptionsQuestion: React.FunctionComponent<UnitOptionsQuestionProps> = (props) => {
  const isLocked = useLearnUnitStore((state) => state.data.activeQuestionData.isLocked);

  const selectedAnswer = useLearnUnitStore((state) => {
    if (isOptionsQuestion(state.data.activeQuestionData.data)) {
      return state.data.activeQuestionData.data.selectedAnswer;
    }

    return null;
  });

  const setSelectedAnswer = useLearnUnitStore((state) => state.setActiveQuestionData);

  const handleSelectAnswer = (newAnswer: string) => {
    setSelectedAnswer({ type: "GUESS_THE_SENTENCE_MEAN", selectedAnswer: selectedAnswer === newAnswer ? null : newAnswer, answer: props.data.answer });
  };

  return <OptionsQuestion {...props} handleSelectAnswer={handleSelectAnswer} isLocked={isLocked} selectedAnswer={selectedAnswer} />;
};

export default UnitOptionsQuestion;
