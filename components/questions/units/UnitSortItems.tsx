import React from "react";
import { type SorterItemData } from "~/components/questions/ItemSorter";
import useLearnUnitStore from "~/stores/learnUnitStore";
import { isSortQuestion } from "~/helpers/unitQuestionNarrowing";
import SortItems, { SortItemsProps } from "../SortItems";

export type UnitSortItemsProps = Pick<SortItemsProps, "answer" | "options" | "renderQuestion">;

const UnitSortItems: React.FunctionComponent<UnitSortItemsProps> = (props) => {
  const selectedItems =
    useLearnUnitStore((state) => {
      if (isSortQuestion(state.data.activeQuestionData.data)) {
        return state.data.activeQuestionData.data.selectedAnswer;
      }

      return null;
    }) ?? [];

  console.log({ selectedItems });

  const setSelectedAnswer = useLearnUnitStore((state) => state.setActiveQuestionData);

  const setSelectedItems = (newAnswer: SorterItemData[]) => {
    setSelectedAnswer({ type: "SORT_THE_MEAN", selectedAnswer: newAnswer, answer: props.answer });
  };

  return <SortItems {...props} selectedItems={selectedItems} setSelectedItems={setSelectedItems} />;
};

export default UnitSortItems;
