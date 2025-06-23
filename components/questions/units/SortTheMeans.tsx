import React from "react";
import { UnitQuestionType } from "~/types";
import SortItems from "../SortItems";
import QuestionSentenceButton from "../QuestionSentenceButton";

export type SortTheMeansProps = {
  question: Extract<UnitQuestionType, { type: "SORT_THE_MEANS" }>;
  onCorrectAnswer?: () => void;
  onErrorAnswer?: () => void;
};

const SortTheMeans: React.FunctionComponent<SortTheMeansProps> = (props) => {
  return (
    <SortItems
      {...props}
      answer={props.question.data.answer.en}
      options={props.question.data.options.map((item) => ({ number: item.number, value: item.value.en }))}
      renderQuestion={() => {
        return (
          <QuestionSentenceButton
            sentence={props.question.data.question.map((item) => ({
              word: item.value,
              hintData: [item.value, ...Object.values(item.alternative ?? {}), item.mean.en],
            }))}
          />
        );
      }}
    />
  );
};

export default SortTheMeans;
