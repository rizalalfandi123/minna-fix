import React from "react";
import useLearnUnitStore, { TUnitGuessQuestion } from "~/stores/learnUnitStore";
import { isOptionsQuestion } from "~/helpers/unitQuestionNarrowing";
import OptionsQuestion, { OptionsQuestionProps } from "../OptionsQuestion";

export type UnitOptionsQuestionProps = Omit<OptionsQuestionProps, "handleSelectAnswer" | "selectedAnswer" | "isLocked"> & {
  type: TUnitGuessQuestion;
};

const UnitOptionsQuestion: React.FunctionComponent<UnitOptionsQuestionProps> = ({ type, ...props }) => {
  const isLocked = useLearnUnitStore((state) => state.data.activeQuestionData.isLocked);

  const selectedAnswer = useLearnUnitStore((state) => {
    if (isOptionsQuestion(state.data.activeQuestionData.data)) {
      return state.data.activeQuestionData.data.selectedAnswer;
    }

    return null;
  });

  const setSelectedAnswer = useLearnUnitStore((state) => state.setActiveQuestionData);

  const handleSelectAnswer = (newAnswer: string) => {
    setSelectedAnswer({ type, selectedAnswer: selectedAnswer === newAnswer ? null : newAnswer, answer: props.data.answer });
  };

  return <OptionsQuestion {...props} handleSelectAnswer={handleSelectAnswer} isLocked={isLocked} selectedAnswer={selectedAnswer} />;
};

export default UnitOptionsQuestion;
