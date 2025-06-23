import { UnitQuestionType } from "~/types";
import QuestionSentenceButton from "../QuestionSentenceButton";
import React from "react";
import WriteTheSymbol from "../WriteTheSymbol";

export type WriteTheSymbolFromMeanProps = {
  question: Extract<UnitQuestionType, { type: "WRITE_THE_SYMBOL_FROM_MEAN" }>;
  onCorrectAnswer?: () => void;
  onErrorAnswer?: () => void;
};

const WriteTheSymbolFromMean: React.FC<WriteTheSymbolFromMeanProps> = (props) => {
  return (
    <WriteTheSymbol
      data={{
        answer: props.question.data.answer,
      }}
      renderQuestion={() => {
        return (
          <QuestionSentenceButton
            sentence={props.question.data.question.map((item) => ({
              word: item.mean.en,
              hintData: [item.value, ...Object.values(item.alternative ?? {}), item.mean.en],
            }))}
          />
        );
      }}
      onCorrectAnswer={props.onCorrectAnswer}
      onErrorAnswer={props.onErrorAnswer}
    />
  );
};

export default WriteTheSymbolFromMean;
