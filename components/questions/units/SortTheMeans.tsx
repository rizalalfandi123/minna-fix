import React, { useMemo } from "react";
import { UnitQuestionType } from "~/types";
import QuestionSentenceButton from "../QuestionSentenceButton";
import { useTranslation } from "react-i18next";
import { Language } from "~/contexts/userContext";
import UnitSortItems from "./UnitSortItems";
import { shuffleArray } from "~/helpers/array";

export type SortTheMeansProps = {
  question: Extract<UnitQuestionType, { type: "SORT_THE_MEAN" }>;
  withHint: boolean;
};

const SortTheMeans: React.FunctionComponent<SortTheMeansProps> = (props) => {
  const { i18n, t } = useTranslation();

  const activeLang = i18n.language as Language;

  const { answer, options, sentence } = useMemo(
    () => ({
      sentence: props.question.data.question,
      answer: props.question.data.answer[activeLang],
      options: shuffleArray(props.question.data.options[activeLang]),
    }),
    [props.question]
  );

  return (
    <UnitSortItems
      type="SORT_THE_MEAN"
      instruction={t('instruction.sort_the_mean')}
      answer={answer}
      options={options}
      renderQuestion={() => {
        return <QuestionSentenceButton sentence={sentence} withHint={props.withHint} />;
      }}
    />
  );
};

export default SortTheMeans;
