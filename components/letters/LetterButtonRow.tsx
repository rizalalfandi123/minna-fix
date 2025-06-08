import React from "react";

import { ListRenderItemInfo, View } from "react-native";
import { isWeb } from "~/helpers/platform";
import { TLetterChart } from "~/types";
import MemoizedLetterButton from "./LetterButton";
import { Text } from "../ui/text";
import { cn } from "~/lib/utils";

export type TLetterButtonRow = {
    id: string;
    chart: TLetterChart;
    symbolClassName?: string;
    title: string;
    description: string;
};

const LetterButtonRow: React.FC<Pick<ListRenderItemInfo<TLetterButtonRow>, "item">> = ({ item }) => {
    return (
        <View className={cn("mb-8 w-full px-4", { "p-1 md:p-4": isWeb })}>
            <View className="mb-2 px-1.5">
                <Text className="mb-1 font-sans-semibold text-xl">{item.title}</Text>
                <Text>{item.description}</Text>
            </View>
            {item.chart.map((row, rowIndex) => {
                return (
                    <View key={rowIndex} className={cn("w-full flex-row", isWeb ? "h-32" : "h-28")}>
                        {row.map((cell, cellIndex) => {
                            return (
                                <View
                                    key={cellIndex}
                                    className={cn("flex-1 items-center justify-center p-1.5", {
                                        "p-1 md:p-1.5": isWeb,
                                    })}
                                >
                                    <MemoizedLetterButton data={cell} symbolClassName={item.symbolClassName} />
                                </View>
                            );
                        })}
                    </View>
                );
            })}
        </View>
    );
};

const MemoizedLetterButtonRow = React.memo(LetterButtonRow);

export default MemoizedLetterButtonRow;
