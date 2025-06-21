import React from "react";
import LetterSound from "~/components/questions/LetterSound";
import SortItems from "../SortItems";
import { LetterQuestionType } from "~/types";
import { shuffleArray } from "~/helpers/array";

export type SortItemsBySoundProps = {
  question: Extract<LetterQuestionType, { type: "SORT_THE_ITEMS_BY_SOUND" }>;
  onCorrectAnswer?: () => void;
  onErrorAnswer?: () => void;
};
export type SorterItemData = Record<"number" | "width" | "index", number> & { value: string };

const SortItemsBySound: React.FunctionComponent<SortItemsBySoundProps> = ({ question, onCorrectAnswer, onErrorAnswer }) => {
  const suffleOptions = React.useMemo(() => shuffleArray(question.data.options), [question.data.options]);

  return (
    <SortItems
      answer={question.data.answer}
      options={suffleOptions}
      renderQuestion={() => {
        return <LetterSound symbol={question.data.answer} />;
      }}
      onCorrectAnswer={onCorrectAnswer}
      onErrorAnswer={onErrorAnswer}
    />
  );
};

export default SortItemsBySound;
