import React from "react";
import { UnitQuestionType } from "~/types";
import QuestionSentenceButton from "../QuestionSentenceButton";
import UnitSortItems from "./UnitSortItems";
import { useTranslation } from "react-i18next";
import { Language } from "~/contexts/userContext";

export type SortTheSymbolFromMeanProps = {
  question: Extract<UnitQuestionType, { type: "SORT_THE_SYMBOLS_FROM_MEAN" }>;
  withHint: boolean;
};

const SortTheSymbolFromMean: React.FunctionComponent<SortTheSymbolFromMeanProps> = (props) => {
  const { i18n } = useTranslation();

  const activeLang = i18n.language as Language;

  const { sentence, ...data } = React.useMemo(
    () => ({
      answer: props.question.data.answer,
      options: props.question.data.options,
      sentence: props.question.data.question[activeLang],
    }),
    []
  );

  return (
    <UnitSortItems
      type="SORT_THE_SYMBOLS_FROM_MEAN"
      answer={data.answer}
      options={data.options}
      renderQuestion={() => {
        return <QuestionSentenceButton translateAsValue withSpeak={false} sentence={sentence} withHint={props.withHint} />;
      }}
    />
  );
};

export default SortTheSymbolFromMean;
