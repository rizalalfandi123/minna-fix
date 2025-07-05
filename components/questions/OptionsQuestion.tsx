import React from "react";
import { type Nullable } from "~/types";
import { View } from "react-native";

export type OptionsQuestionProps = {
  data: {
    options: string[];
    answer: string;
    // question: string;
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
  handleSelectAnswer: (newAnswer: string) => void;
  selectedAnswer: Nullable<string>;
  isLocked: boolean;
};

const OptionsQuestion: React.FunctionComponent<OptionsQuestionProps> = ({
  data,
  renderAnswer,
  renderInstruction,
  renderOptions,
  handleSelectAnswer,
  selectedAnswer,
  isLocked,
}) => {
  return (
    <View className="w-full flex-1 flex-col">
      {renderInstruction && renderInstruction({ data })}

      {renderAnswer && <View className="w-full flex-1 items-center justify-center">{renderAnswer({ data })}</View>}

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
