import React from "react";
import { View } from "react-native";
import ItemSorter, { SorterItem, SorterItemData } from "~/components/questions/ItemSorter";
import { useTranslation } from "react-i18next";
import { Text } from "~/components/ui/text";

export type SortItemsProps = {
  answer: string;
  options: Array<SorterItem>;
  renderQuestion: (props: Pick<SortItemsProps, "answer" | "options">) => React.ReactNode;
  selectedItems: SorterItemData[];
  setSelectedItems: (newAnswer: SorterItemData[]) => void;
};

const SortItems: React.FunctionComponent<SortItemsProps> = ({ answer, options, renderQuestion, selectedItems, setSelectedItems }) => {
  const { t } = useTranslation();

  return (
    <View className="w-full flex-1 flex-col">
      <Text className="w-full px-4 text-left font-sans-medium text-lg">{t("instruction.sort_items_by_sound")}</Text>

      <View className="flex-1 items-center justify-center px-4">{renderQuestion({ answer, options })}</View>

      <ItemSorter containerHeight={320} items={options} selectedItems={selectedItems} setSelectedItems={(newItems) => setSelectedItems(newItems)} />
    </View>
  );
};

export default SortItems;
