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

  const { sentence, ...data } = React.useMemo(
    () => ({
      answer: props.question.data.answer,
      sentence: props.question.data.question[activeLang],
    }),
    []
  );

  return (
    <WriteTheSymbol
      data={data}
      renderQuestion={() => {
        return <QuestionSentenceButton withSpeak={false} sentence={sentence} withHint={props.withHint} />;
      }}
    />
  );
};

export default WriteTheSymbolFromMean;
