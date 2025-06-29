import React from "react";
import LetterSound from "~/components/questions/LetterSound";
import { LetterQuestionType } from "~/types";
import { shuffleArray } from "~/helpers/array";
import LetterSortItems from "./LetterSortItems";

export type SortItemsBySoundProps = {
  question: Extract<LetterQuestionType, { type: "SORT_THE_ITEMS_BY_SOUND" }>;
};

const SortItemsBySound: React.FunctionComponent<SortItemsBySoundProps> = ({ question }) => {
  const suffleOptions = React.useMemo(() => shuffleArray(question.data.options), [question.data.options]);

  return (
    <LetterSortItems
      answer={question.data.answer}
      options={suffleOptions}
      renderQuestion={() => {
        return <LetterSound symbol={question.data.answer} />;
      }}
    />
  );
};

export default SortItemsBySound;
