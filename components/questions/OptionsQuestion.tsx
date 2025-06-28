import React from "react";
import { type Nullable } from "~/types";
import { View } from "react-native";
import useLearnUnitStore from "~/stores/learnUnitStore";
import { isOptionsQuestion } from "~/helpers/unitQuestionNarrowing";

export type OptionsQuestionProps = {
  data: {
    options: string[];
    answer: string;
    question: string;
  };
  renderAnswer?: (props: Pick<OptionsQuestionProps, "data">) => React.ReactNode;
  renderInstruction?: (props: Pick<OptionsQuestionProps, "data">) => React.ReactNode;
  renderOptions?: (
    props: Pick<OptionsQuestionProps, "data"> & {
      onSelectOption: (option: string) => void;
      selectedAnswer: Nullable<string>;
      disabled: boolean;
    }
  ) => React.ReactNode;
};

const OptionsQuestion: React.FunctionComponent<OptionsQuestionProps> = ({ data, renderAnswer, renderInstruction, renderOptions }) => {
  const isLocked = useLearnUnitStore((state) => state.data.activeQuestionData.isLocked);

  const selectedAnswer = useLearnUnitStore((state) => {
    if (isOptionsQuestion(state.data.activeQuestionData.data)) {
      return state.data.activeQuestionData.data.selectedAnswer;
    }

    return null;
  });

  const setSelectedAnswer = useLearnUnitStore((state) => state.setActiveQuestionData);

  const handleSelectAnswer = (newAnswer: string) => {
    setSelectedAnswer({ type: "GUESS_THE_SENTENCE_MEAN", selectedAnswer: selectedAnswer === newAnswer ? null : newAnswer, answer: data.answer });
  };

  return (
    <View className="w-full flex-1 flex-col">
      {renderInstruction && renderInstruction({ data })}

      {renderAnswer && <View className="w-full flex-1 items-center bg-red-400 justify-center">{renderAnswer({ data })}</View>}

      {renderOptions && (
        <View className="h-64 items-center justify-center">
          {renderOptions({
            data,
            disabled: isLocked,
            onSelectOption: handleSelectAnswer,
            selectedAnswer,
          })}
        </View>
      )}
    </View>
  );
};

export default OptionsQuestion;
