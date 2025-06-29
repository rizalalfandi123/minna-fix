import React from "react";
import { TAnswerStatus } from "~/types";
import { View } from "react-native";
import AnswerButton from "~/components/questions/AnswerButton";
import ItemSorter, { SorterItem, SorterItemData } from "~/components/questions/ItemSorter";
import { useTranslation } from "react-i18next";
import { Text } from "~/components/ui/text";
import useLearnUnitStore from "~/stores/learnUnitStore";
import { isSortQuestion } from "~/helpers/unitQuestionNarrowing";

export type SortItemsProps = {
  answer: string;
  options: Array<SorterItem>;
  renderQuestion: (props: Pick<SortItemsProps, "answer" | "options">) => React.ReactNode;
};

const SortItems: React.FunctionComponent<SortItemsProps> = ({ answer, options, renderQuestion }) => {
  const { t } = useTranslation();

  // const [answerStatus, setAnswerStatus] = React.useState<TAnswerStatus>(null);

  // const [selectedItems, setSelectedItems] = React.useState<Array<TSorterItemData>>([]);

  // const [isLocked, setIsLocked] = React.useState<boolean>(true);

  const isLocked = useLearnUnitStore((state) => state.data.activeQuestionData.isLocked);

  const setIsLocked = useLearnUnitStore((state) => state.setIsLocked);

  const selectedItems = useLearnUnitStore((state) => {
    if (isSortQuestion(state.data.activeQuestionData.data)) {
      return state.data.activeQuestionData.data.selectedAnswer;
    }

    return [];
  });

  
  const setSelectedAnswer = useLearnUnitStore((state) => state.setActiveQuestionData);

  const setSelectedItems = (newAnswer:  SorterItemData[]) => {
    setSelectedAnswer({ type: "SORT_THE_MEAN", selectedAnswer:newAnswer, answer });
  };

  // const handleCekAnswer = () => {
  //   if (selectedItems.length <= 0) {
  //     return;
  //   }

  //   const isCorrectAnswer = answer === selectedItems.map((item) => item.value).join("");

  //   setAnswerStatus(isCorrectAnswer ? "success" : "error");
  // };

  // const handleReset = () => {
  //   setIsLocked(false);

  //   setSelectedItems([]);

  //   setAnswerStatus(null);
  // };

  // const handleNext = () => {
  //   if (answerStatus === null) {
  //     handleCekAnswer();
  //   } else {
  //     if (answerStatus === "success") {
  //       onCorrectAnswer?.();
  //     } else {
  //       onErrorAnswer?.();
  //     }

  //     React.startTransition(() => {
  //       handleReset();
  //     });
  //   }
  // };

  React.useEffect(() => {
    if (selectedItems.length > 0 && isLocked) {
      setIsLocked(false);
    }

    if (selectedItems.length <= 0 && !isLocked) {
      setIsLocked(true);
    }
  }, [selectedItems, isLocked]);

  return (
    <View className="w-full flex-1 flex-col">
      <Text className="w-full px-4 text-left font-sans-medium text-lg">{t("instruction.sort_items_by_sound")}</Text>

      <View className="flex-1 items-center justify-center px-4">{renderQuestion({ answer, options })}</View>

      <ItemSorter containerHeight={320} items={options} selectedItems={selectedItems} setSelectedItems={(newItems) => setSelectedItems(newItems)} />
    </View>
  );
};

export default SortItems;
