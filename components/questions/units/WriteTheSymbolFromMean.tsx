import { UnitQuestionType } from "~/types";
import QuestionSentenceButton, { QuestionSentenceButtonProps } from "../QuestionSentenceButton";
import React from "react";
import WriteTheSymbol from "../WriteTheSymbol";
import { useTranslation } from "react-i18next";
import { Language } from "~/contexts/userContext";
import useBuildSentence from "~/hooks/useBuildSentence";

export type WriteTheSymbolFromMeanProps = {
  question: Extract<UnitQuestionType, { type: "WRITE_THE_SYMBOL_FROM_MEAN" }>;
  withHint: boolean;
};

const WriteTheSymbolFromMean: React.FC<WriteTheSymbolFromMeanProps> = (props) => {
  const sentence = useBuildSentence({ data: props.question.data.question });

  return (
    <WriteTheSymbol
      data={{
        answer: props.question.data.answer,
      }}
      renderQuestion={() => {
        return <QuestionSentenceButton withSpeak={false} sentence={sentence} withHint={props.withHint} />;
      }}
    />
  );
};

export default WriteTheSymbolFromMean;
