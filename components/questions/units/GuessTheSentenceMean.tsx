import QuestionSentenceButton, { QuestionSentenceButtonProps } from "../QuestionSentenceButton";
import { View } from "react-native";
import { Text } from "~/components/ui/text";
import LetterOptions from "../LetterOptions";
import { UnitQuestionType } from "~/types";
import { useTranslation } from "react-i18next";
import { Language } from "~/contexts/userContext";
import UnitOptionsQuestion from "./UnitOptionsQuestion";
import React from "react";

export type GuessTheSentenceMeanProps = {
  question: Extract<UnitQuestionType, { type: "GUESS_THE_SENTENCE_MEAN" }>;
  withHint: boolean;
};

const GuessTheSentenceMean: React.FC<GuessTheSentenceMeanProps> = ({ question, withHint }) => {
  const { i18n } = useTranslation();

  const activeLang = i18n.language as Language;

  const { sentence, ...data } = React.useMemo(
    () => ({
      answer: question.data.answer[activeLang],
      options: question.data.options[activeLang],
      sentence: question.data.question,
    }),
    [question]
  );

  return (
    <UnitOptionsQuestion
      type="GUESS_THE_SENTENCE_MEAN"
      data={data}
      renderAnswer={() => {
        return <QuestionSentenceButton sentence={sentence} withHint={withHint} />;
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

export default GuessTheSentenceMean;
