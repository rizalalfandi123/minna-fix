import React from "react";
import { type SorterItemData } from "~/components/questions/ItemSorter";
import { isSortQuestion } from "~/helpers/letterQuestionNarrowing";
import SortItems, { SortItemsProps } from "../SortItems";
import useLearnLetterStore from "~/stores/learnLetterStore";

export type LetterSortItemsProps = Pick<SortItemsProps, "answer" | "options" | "renderQuestion">;

const LetterSortItems: React.FunctionComponent<LetterSortItemsProps> = (props) => {
  const selectedItems =
    useLearnLetterStore((state) => {
      if (isSortQuestion(state.data.activeQuestionData.data)) {
        return state.data.activeQuestionData.data.selectedAnswer;
      }

      return null;
    }) ?? [];

  const setSelectedAnswer = useLearnLetterStore((state) => state.setActiveQuestionData);

  const setSelectedItems = (newAnswer: SorterItemData[]) => {
    setSelectedAnswer({ type: "SORT_THE_ITEMS_BY_SOUND", selectedAnswer: newAnswer, answer: props.answer });
  };

  return <SortItems {...props} selectedItems={selectedItems} setSelectedItems={setSelectedItems} />;
};

export default LetterSortItems;
