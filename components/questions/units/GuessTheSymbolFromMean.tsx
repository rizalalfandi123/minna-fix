import { UnitQuestionType } from "~/types";
import QuestionSentenceButton from "../QuestionSentenceButton";
import { View } from "react-native";
import { Text } from "~/components/ui/text";
import LetterOptions from "../LetterOptions";
import UnitOptionsQuestion from "./UnitOptionsQuestion";
import React from "react";
import { Language } from "~/contexts/userContext";
import { useTranslation } from "react-i18next";

export type GuessTheSymbolFromMeanProps = {
  question: Extract<UnitQuestionType, { type: "GUESS_THE_SYMBOL_FROM_MEAN" }>;
  withHint: boolean;
};

const GuessTheSymbolFromMean: React.FC<GuessTheSymbolFromMeanProps> = ({ question, withHint }) => {
  const { i18n } = useTranslation();

  const activeLang = i18n.language as Language;

  const { sentence, ...data } = React.useMemo(
    () => ({
      answer: question.data.answer,
      options: question.data.options,
      sentence: question.data.question[activeLang],
    }),
    []
  );

  return (
    <UnitOptionsQuestion
      type="GUESS_THE_SYMBOL_FROM_MEAN"
      data={data}
      renderAnswer={() => {
        return <QuestionSentenceButton withSpeak={false} translateAsValue sentence={sentence} withHint={withHint} />;
      }}
      renderInstruction={() => {
        return (
          <View className="w-full items-center justify-center">
            <Text className="w-full text-center font-sans-medium text-lg">dwwd</Text>
          </View>
        );
      }}
      renderOptions={({ data, ...props }) => {
        return <LetterOptions {...props} options={data.options} />;
      }}
    />
  );
};

export default GuessTheSymbolFromMean;
