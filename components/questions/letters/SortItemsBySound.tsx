import React from "react";
import { LetterQuestionType } from "~/services/queries/letterQuestionQueries";
import LetterSound from "~/components/questions/LetterSound";
import SortItems from "../SortItems";

export type SortItemsBySoundProps = {
  question: Extract<LetterQuestionType, { type: "SORT_THE_ITEMS_BY_SOUND" }>;
  onCorrectAnswer?: () => void;
  onErrorAnswer?: () => void;
};
export type SorterItemData = Record<"number" | "width" | "index", number> & { value: string };

const SortItemsBySound: React.FunctionComponent<SortItemsBySoundProps> = ({ question, onCorrectAnswer, onErrorAnswer }) => {
  return (
    <SortItems
      answer={question.data.answer}
      options={question.data.options}
      renderQuestion={() => {
        return <LetterSound symbol={question.data.answer} />;
      }}
      onCorrectAnswer={onCorrectAnswer}
      onErrorAnswer={onErrorAnswer}
    />
  );
};

export default SortItemsBySound;
