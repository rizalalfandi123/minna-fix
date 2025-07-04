import React from "react";
import SortItems, { SortItemsProps } from "../SortItems";
import useLearnLetterStore from "~/stores/learnLetterStore";

export type LetterSortItemsProps = Pick<SortItemsProps, "answer" | "options" | "renderQuestion">;

const LetterSortItems: React.FunctionComponent<LetterSortItemsProps> = (props) => {
  const setSelectedAnswer = useLearnLetterStore((state) => state.setActiveQuestionData);

  const setSelectedItems = (newAnswer: string[]) => {
    setSelectedAnswer({ type: "SORT_THE_ITEMS_BY_SOUND", selectedAnswer: newAnswer, answer: props.answer });
  };

  return (
    <SortItems
      dndProps={{
        wordHeight: 52,
        lineHeight: 60,
      }}
      setSelectedItems={setSelectedItems}
      {...props}
    />
  );
};

export default LetterSortItems;
