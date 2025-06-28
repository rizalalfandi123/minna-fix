import { LegendList, LegendListRef, LegendListRenderItemProps } from "@legendapp/list";
import React from "react";
import { View } from "react-native";
import { Text } from "../ui/text";
import { contentWidth } from "~/lib/constants/sizes";
import useScreenHeight from "~/helpers/useScreenHeight";
import { Button } from "../ui/button";

const DATA = Array.from({ length: 5 }).map((_, i) => i.toString());

const TestPage = () => {
  const listRef = React.useRef<LegendListRef | null>(null);

  const [listData, setListData] = React.useState(() => DATA);

  const { screenHeight } = useScreenHeight();

  const renderItem = ({ item, index }: LegendListRenderItemProps<string>) => {
    const handleCorrect = () => {
      if (listRef.current) {
        listRef.current.scrollToIndex({ index: index + 1 });
      }
    };

    const handleIncorrect = () => {
      if (listRef.current) {
        const state = listRef.current.getState();

        console.log({ listData });

        const newValue = [...listData];

        console.log({ newValue });

        newValue.splice(newValue.length - 1, 0, `Ref-${item}-in-${index}`);

        setListData(newValue);

        console.log({ newValue, index, state });
        listRef.current.scrollToIndex({ index: index + 1 });
      }
    };

    return (
      <View style={{ width: contentWidth, height: screenHeight - 80 }} className="justify-center flex-col gap-2 items-center">
        <Text className="text-2xl">{item}</Text>

        <Button onPress={handleCorrect}>
          <Text>True</Text>
        </Button>

        <Button onPress={handleIncorrect}>
          <Text>False</Text>
        </Button>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-background">
      <View className="h-20" />
      <LegendList
        data={listData}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        horizontal
        keyExtractor={(item, inex) => item}
        extraData={listData}
        ref={listRef}
      />
    </View>
  );
};

export default TestPage;
