import React from "react";
import { UnitQuestionType } from "~/types";
import SortItems from "../SortItems";
import QuestionSentenceButton from "../QuestionSentenceButton";

export type SortTheSymbolFromMeanProps = {
  question: Extract<UnitQuestionType, { type: "SORT_THE_SYMBOLS_FROM_MEAN" }>;
  onCorrectAnswer?: () => void;
  onErrorAnswer?: () => void;
};

const SortTheSymbolFromMean: React.FunctionComponent<SortTheSymbolFromMeanProps> = (props) => {
  return (
    <SortItems
      {...props}
      answer={props.question.data.answer}
      options={props.question.data.options.map((item) => ({ number: item.number, value: item.value }))}
      renderQuestion={() => {
        return (
          <QuestionSentenceButton
            withSpeak={false}
            sentence={props.question.data.question.map((item) => ({
              word: item.mean.en,
              hintData: [item.value, ...Object.values(item.alternative ?? {}), item.mean.en],
            }))}
          />
        );
      }}
    />
  );
};

export default SortTheSymbolFromMean;
