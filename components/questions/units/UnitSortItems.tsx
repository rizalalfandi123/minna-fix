import React from "react";
import useLearnUnitStore from "~/stores/learnUnitStore";
import SortItems, { SortItemsProps } from "../SortItems";

export type UnitSortItemsProps = Pick<SortItemsProps, "answer" | "options" | "renderQuestion"> & {
  type: "SORT_THE_SYMBOLS_FROM_MEAN" | "SORT_THE_MEAN" | "SORT_THE_SYMBOLS_FROM_SOUND";
};

const UnitSortItems: React.FunctionComponent<UnitSortItemsProps> = (props) => {
  const setSelectedAnswer = useLearnUnitStore((state) => state.setActiveQuestionData);

  const setSelectedItems = (newAnswer: string[]) => {
    setSelectedAnswer({ type: props.type, selectedAnswer: newAnswer, answer: props.answer });
  };

  return (
    <SortItems
      {...props}
      dndProps={{
        wordHeight: 40,
        lineHeight: 49,
      }}
      setSelectedItems={setSelectedItems}
    />
  );
};

export default UnitSortItems;
