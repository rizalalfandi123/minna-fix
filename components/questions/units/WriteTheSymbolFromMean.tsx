import { UnitQuestionType } from "~/types";
import QuestionSentenceButton from "../QuestionSentenceButton";
import React from "react";
import WriteTheSymbol from "../WriteTheSymbol";
import { useTranslation } from "react-i18next";
import { Language } from "~/contexts/userContext";

export type WriteTheSymbolFromMeanProps = {
  question: Extract<UnitQuestionType, { type: "WRITE_THE_SYMBOL_FROM_MEAN" }>;
  withHint: boolean;
};

const WriteTheSymbolFromMean: React.FC<WriteTheSymbolFromMeanProps> = (props) => {
  const { i18n } = useTranslation();

  const activeLang = i18n.language as Language;

  return (
    <WriteTheSymbol
      data={{
        answer: props.question.data.answer,
      }}
      renderQuestion={() => {
        return (
          <QuestionSentenceButton
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

export default WriteTheSymbolFromMean;
