import React from "react";
import { UnitQuestionType } from "~/types";
import SortItems from "../SortItems";
import QuestionSentenceButton from "../QuestionSentenceButton";
import { useTranslation } from "react-i18next";
import { Language } from "~/contexts/userContext";

export type SortTheMeansProps = {
  question: Extract<UnitQuestionType, { type: "SORT_THE_MEAN" }>;
  withHint: boolean;
};

const SortTheMeans: React.FunctionComponent<SortTheMeansProps> = (props) => {
  const { i18n } = useTranslation();

  const activeLang = i18n.language as Language;

  return (
    <SortItems
      {...props}
      answer={props.question.data.answer[activeLang]}
      options={props.question.data.options.map((item, index) => ({ number: index, value: item[activeLang] }))}
      renderQuestion={() => {
        return (
          <QuestionSentenceButton
            sentence={props.question.data.question.map((item) => ({
              word: item.value,
              hintData: [...Object.values(item.alternative ?? {}), item.mean[activeLang]],
            }))}
            withHint={props.withHint}
          />
        );
      }}
    />
  );
};

export default SortTheMeans;
