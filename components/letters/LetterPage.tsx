import React from "react";
import { isWeb } from "~/helpers/platform";
import MemoizedLetterButtonRow, { TLetterButtonRow } from "./LetterButtonRow";
import { View, FlatList } from "react-native";
import { useTranslation } from "react-i18next";
import { cn } from "~/lib/utils";
import { Button } from "../ui/button";
import { Text } from "../ui/text";
import { letterHeight } from "~/lib/constants/sizes";

const LetterPage: React.FC<{
  letterBlocks: Array<TLetterButtonRow>;
  onPressLearn: () => void;
}> = ({ letterBlocks, onPressLearn }) => {
  const { t } = useTranslation();

  return (
    <>
      <View className={cn("bg-background flex-1")}>
        <View className="h-20 w-full items-center justify-center px-4">
          <Button className="w-full" onPress={onPressLearn}>
            <Text className="font-sans-semibold text-lg uppercase">{t("startLearning")}</Text>
          </Button>
        </View>

        <FlatList<TLetterButtonRow>
          data={letterBlocks}
          style={isWeb ? { height: letterHeight } : undefined}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <MemoizedLetterButtonRow item={item} />}
          contentContainerStyle={{
            paddingBottom: isWeb ? 84 : 0,
          }}
          getItemLayout={(_data, index) => ({
            length: 128,
            offset: 128 * index,
            index,
          })}
        />
      </View>
    </>
  );
};

export default LetterPage;
