import React, { useMemo } from "react";
import { UnitQuestionType } from "~/types";
import QuestionSentenceButton from "../QuestionSentenceButton";
import { useTranslation } from "react-i18next";
import { Language } from "~/contexts/userContext";
import UnitSortItems from "./UnitSortItems";
import useBuildSentence from "~/hooks/useBuildSentence";

export type SortTheMeansProps = {
  question: Extract<UnitQuestionType, { type: "SORT_THE_MEAN" }>;
  withHint: boolean;
};

const SortTheMeans: React.FunctionComponent<SortTheMeansProps> = (props) => {
  const { i18n } = useTranslation();

  const activeLang = i18n.language as Language;

  const sentence = useBuildSentence({ data: props.question.data.question, isUseTranslation: false });

  const data = useMemo(
    () => ({ answer: props.question.data.answer[activeLang].translate, options: props.question.data.options.map((item) => item[activeLang].translate) }),
    [props.question]
  );

  return (
    <UnitSortItems
      type="SORT_THE_MEAN"
      answer={data.answer}
      options={data.options}
      renderQuestion={() => {
        return <QuestionSentenceButton sentence={sentence} withHint={props.withHint} />;
      }}
    />
  );
};

export default SortTheMeans;
