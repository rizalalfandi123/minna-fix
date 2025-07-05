import React, { useMemo } from "react";
import { UnitQuestionType } from "~/types";
import QuestionSentenceButton from "../QuestionSentenceButton";
import { useTranslation } from "react-i18next";
import { Language } from "~/contexts/userContext";
import UnitSortItems from "./UnitSortItems";

export type SortTheMeansProps = {
  question: Extract<UnitQuestionType, { type: "SORT_THE_MEAN" }>;
  withHint: boolean;
};

const SortTheMeans: React.FunctionComponent<SortTheMeansProps> = (props) => {
  const { i18n } = useTranslation();

  const activeLang = i18n.language as Language;

  const { answer, options, sentence } = useMemo(
    () => ({
      sentence: props.question.data.question,
      answer: props.question.data.answer[activeLang],
      options: props.question.data.options[activeLang],
    }),
    [props.question]
  );

  return (
    <UnitSortItems
      type="SORT_THE_MEAN"
      answer={answer}
      options={options}
      renderQuestion={() => {
        return <QuestionSentenceButton sentence={sentence} withHint={props.withHint} />;
      }}
    />
  );
};

export default SortTheMeans;
