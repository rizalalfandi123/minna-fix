import QuestionSentenceButton from "../QuestionSentenceButton";
import { View } from "react-native";
import LetterOptions from "../LetterOptions";
import { UnitQuestionType } from "~/types";
import { useTranslation } from "react-i18next";
import UnitOptionsQuestion from "./UnitOptionsQuestion";
import React from "react";
import QuestionInstructure from "../QuestionInstruction";
import { TLanguage } from "~/stores/userStore";

export type GuessTheSentenceMeanProps = {
  question: Extract<UnitQuestionType, { type: "GUESS_THE_SENTENCE_MEAN" }>;
  withHint: boolean;
};

const GuessTheSentenceMean: React.FC<GuessTheSentenceMeanProps> = ({ question, withHint }) => {
  const { i18n, t } = useTranslation();

  const activeLang = i18n.language as TLanguage;

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
            <QuestionInstructure>{t("instruction.guess_the_sentence_mean")}</QuestionInstructure>
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
