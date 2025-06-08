import React from "react";
import { Nullable } from "~/types";
import { View } from "react-native";
import { Button } from "../ui/button";
import { Text } from "../ui/text";

const LetterOptions: React.FunctionComponent<{
  options: Array<string>;
  selectedAnswer: Nullable<string>;
  onSelectOption: (option: string) => void;
  disabled?: boolean;
}> = ({ options, onSelectOption, selectedAnswer, disabled }) => {
  return (
    <View className="flex-row flex-wrap justify-center gap-3">
      {options.map((option, i) => {
        return (
          <Button
            disabled={disabled}
            onPress={() => onSelectOption(option)}
            variant={selectedAnswer === option ? "default" : "outline"}
            key={i}
            size="lg"
          >
            <Text>{option}</Text>
          </Button>
        );
      })}
    </View>
  );
};

export default LetterOptions;
