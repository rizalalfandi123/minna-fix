import React from "react";
import { UnitQuestionType } from "~/types";
import SortItems from "../SortItems";
import QuestionSentenceButton from "../QuestionSentenceButton";
import { useTranslation } from "react-i18next";
import { Language } from "~/contexts/userContext";

export type SortTheSymbolFromMeanProps = {
  question: Extract<UnitQuestionType, { type: "SORT_THE_SYMBOLS_FROM_MEAN" }>;
  withHint: boolean;
};

const SortTheSymbolFromMean: React.FunctionComponent<SortTheSymbolFromMeanProps> = (props) => {
  const { i18n } = useTranslation();

  const activeLang = i18n.language as Language;

  return (
    <SortItems
      {...props}
      answer={props.question.data.answer}
      options={props.question.data.options.map((item, i) => ({ number: i, value: item }))}
      renderQuestion={() => {
        return (
          <QuestionSentenceButton
            withSpeak={false}
            sentence={props.question.data.question.map((item) => ({
              word: item.mean[activeLang],
              hintData: [...Object.values(item.alternative ?? {}), item.mean[activeLang]],
            }))}
            withHint={props.withHint}
          />
        );
      }}
    />
  );
};

export default SortTheSymbolFromMean;
