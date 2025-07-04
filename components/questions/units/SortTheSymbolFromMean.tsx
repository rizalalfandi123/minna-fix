import React from "react";
import { UnitQuestionType } from "~/types";
import QuestionSentenceButton from "../QuestionSentenceButton";
import UnitSortItems from "./UnitSortItems";
import useBuildSentence from "~/hooks/useBuildSentence";

export type SortTheSymbolFromMeanProps = {
  question: Extract<UnitQuestionType, { type: "SORT_THE_SYMBOLS_FROM_MEAN" }>;
  withHint: boolean;
};

const SortTheSymbolFromMean: React.FunctionComponent<SortTheSymbolFromMeanProps> = (props) => {
  const sentence = useBuildSentence({ data: props.question.data.question });

  const data = React.useMemo(() => ({ answer: props.question.data.answer, options: props.question.data.options.map((item) => item) }), [props.question]);

  return (
    <UnitSortItems
      type="SORT_THE_SYMBOLS_FROM_MEAN"
      answer={data.answer}
      options={data.options}
      renderQuestion={() => {
        return <QuestionSentenceButton withSpeak={false} sentence={sentence} withHint={props.withHint} />;
      }}
    />
  );
};

export default SortTheSymbolFromMean;
