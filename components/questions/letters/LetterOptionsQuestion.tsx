import React from "react";
import OptionsQuestion, { OptionsQuestionProps } from "../OptionsQuestion";
import useLearnLetterStore from "~/stores/learnLetterStore";
import { isOptionsQuestion } from "~/helpers/letterQuestionNarrowing";

export type LetterOptionsQuestionProps = Omit<OptionsQuestionProps, "handleSelectAnswer" | "selectedAnswer" | "isLocked"> & {
  type: "GUESS_THE_LETTER" | "GUESS_THE_SYMBOL" | "GUESS_THE_LETTER_SOUND";
};

const LetterOptionsQuestion: React.FunctionComponent<LetterOptionsQuestionProps> = ({ type, ...props }) => {
  const isLocked = useLearnLetterStore((state) => state.data.activeQuestionData.isLocked);

  const selectedAnswer = useLearnLetterStore((state) => {
    if (isOptionsQuestion(state.data.activeQuestionData.data)) {
      return state.data.activeQuestionData.data.selectedAnswer;
    }

    return null;
  });

  const setSelectedAnswer = useLearnLetterStore((state) => state.setActiveQuestionData);

  const handleSelectAnswer = (newAnswer: string) => {
    setSelectedAnswer({ type, selectedAnswer: selectedAnswer === newAnswer ? null : newAnswer, answer: props.data.answer });
  };

  return <OptionsQuestion {...props} handleSelectAnswer={handleSelectAnswer} isLocked={isLocked} selectedAnswer={selectedAnswer} />;
};

export default LetterOptionsQuestion;
