import React from "react";
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { triggerHaptic } from "~/helpers/triggerHaptic";
import { View } from "react-native";
import { contentWidth } from "~/lib/constants/sizes";
import { Button } from "../ui/button";
import { Text } from "../ui/text";

export type SorterItemData = Record<"number" | "width" | "index", number> & {
  value: string;
};
export type SorterItem = Pick<SorterItemData, "number" | "value">;

type ItemSorterProps = {
  containerHeight?: number;
  containerWidth?: number;
  rowHeight?: number;
  itemHeight?: number;
  xSpacing?: number;
  items: Array<SorterItem>;
  selectedItems: Array<SorterItemData>;
  setSelectedItems: (nextSelectedItems: Array<SorterItemData>) => void;
};

const ItemSorter: React.FC<ItemSorterProps> = ({
  containerHeight = 500,
  containerWidth = contentWidth,
  rowHeight = 56,
  itemHeight = 44,
  xSpacing = 8,
  items,
  setSelectedItems,
  selectedItems,
}) => {
  const ySpacing = React.useMemo(
    () => (rowHeight - itemHeight) / 2,
    [rowHeight, itemHeight]
  );

  const [state, setState] = React.useState({
    isLoading: true,
    totalRows: 1,
    itemWidths: [] as Array<SorterItemData>,
    originalPositions: {
      xPositions: items.map(() => xSpacing),
      yPositions: items.map(() => ySpacing),
    },
  });

  const xPositions = useSharedValue<Array<number>>(items.map(() => xSpacing));
  const yPositions = useSharedValue<Array<number>>(items.map(() => ySpacing));

  const animationStyles = items.map((_, i) => {
    return useAnimatedStyle(() => ({
      top: state.isLoading
        ? yPositions.value[i]
        : withTiming(yPositions.value[i]),
      left: state.isLoading
        ? xPositions.value[i]
        : withTiming(xPositions.value[i]),
      position: "absolute",
    }));
  });

  const containerRowHeight = React.useMemo(
    () => state.totalRows * rowHeight,
    [state.totalRows, rowHeight]
  );

  React.useEffect(() => {
    if (state.itemWidths.length === items.length && state.isLoading) {
      const newPositions = calculateItemsPositions({
        itemWidths: state.itemWidths.map((item) => item.width),
        spacing: xSpacing,
        containerWidth,
        ySpacing,
        xSpacing,
        itemHeight,
      });

      xPositions.value = newPositions.xPositions;
      yPositions.value = newPositions.yPositions;

      setState((prev) => ({
        ...prev,
        totalRows: newPositions.totalRow,
        originalPositions: {
          xPositions: newPositions.xPositions,
          yPositions: newPositions.yPositions,
        },
        isLoading: false,
      }));
    }
  }, [state.itemWidths, containerWidth, state.isLoading]);

  React.useEffect(() => {
    if (selectedItems.length === 0) {
      xPositions.value = state.originalPositions.xPositions;
      yPositions.value = state.originalPositions.yPositions;
    }
  }, [selectedItems.length]);

  const handlePressItem = React.useCallback(
    (newItem: SorterItemData) => () => {
      const currentValue = yPositions.value[newItem.index];

      if (!(typeof currentValue === "number")) {
        return;
      }

      if (
        selectedItems.some(
          (selectedItem) => selectedItem.number === newItem.number
        )
      ) {
        const nextSelectedItems = selectedItems.filter(
          (selectedItem) => selectedItem.number !== newItem.number
        );

        setSelectedItems(nextSelectedItems);

        yPositions.value = yPositions.value.map((item, i) => {
          const selectedItemsIndex = nextSelectedItems.findIndex(
            (selectedItem) => selectedItem.index === i
          );

          if (selectedItemsIndex >= 0) {
            const newRows = calculateExistingRow({
              containerWidth,
              spacing: xSpacing,
              itemsWidths: nextSelectedItems,
            });

            const rowPosition = newRows.data.findIndex((row) =>
              row.some((cell) => cell.index === i)
            );
            const existColumnArea = rowHeight * rowPosition + (ySpacing - 1);
            return -containerHeight + containerRowHeight + existColumnArea;
          }

          if (i === newItem.index) {
            return state.originalPositions.yPositions[i];
          }

          return item;
        });

        xPositions.value = xPositions.value.map((item, i) => {
          const selectedItemsIndex = nextSelectedItems.findIndex(
            (selectedItem) => selectedItem.index === i
          );

          if (selectedItemsIndex >= 0) {
            const newRows = calculateExistingRow({
              containerWidth,
              spacing: xSpacing,
              itemsWidths: nextSelectedItems,
            });

            const rowPosition = newRows.data.findIndex((row) =>
              row.some((cell) => cell.index === i)
            );
            const cellPosition = newRows.data[rowPosition].findIndex(
              (cell) => cell.index === i
            );
            const existRowItems = newRows.data[rowPosition].slice(
              0,
              cellPosition
            );

            return (
              existRowItems.reduce((acc, item) => item.width + acc, 0) +
              xSpacing
            );
          }

          if (i === newItem.index) {
            return state.originalPositions.xPositions[i];
          }

          return item;
        });
      } else {
        const nextSelectedItems: Array<SorterItemData> = [
          ...selectedItems,
          { ...newItem, width: state.itemWidths[newItem.index].width },
        ];

        setSelectedItems(nextSelectedItems);

        const newRows = calculateExistingRow({
          containerWidth,
          spacing: xSpacing,
          itemsWidths: nextSelectedItems,
        });

        yPositions.value = yPositions.value.map((item, i) => {
          if (i === newItem.index) {
            const existColumnArea =
              rowHeight * newRows.totalRow + (ySpacing - 1);
            return -containerHeight + containerRowHeight + existColumnArea;
          }
          return item;
        });

        xPositions.value = xPositions.value.map((item, i) => {
          const rows = calculateExistingRow({
            containerWidth,
            spacing: xSpacing,
            itemsWidths: selectedItems,
          });

          if (i === newItem.index) {
            const existRowArea = (rows.data[newRows.totalRow] ?? []).reduce(
              (acc, value) => acc + value.width,
              0
            );
            return existRowArea + xSpacing;
          }
          return item;
        });
      }
    },
    [
      selectedItems,
      state.itemWidths,
      containerWidth,
      containerHeight,
      containerRowHeight,
      xSpacing,
      rowHeight,
      ySpacing,
      state.originalPositions,
    ]
  );

  const handleItemLayout = React.useCallback(
    (index: number, number: number, width: number, value: string) => {
      setState((prev) => {
        const existing = prev.itemWidths[index];
        if (existing?.width === Math.ceil(width)) return prev;

        const newItemWidths = [...prev.itemWidths];
        newItemWidths[index] = {
          width: Math.ceil(width),
          number,
          index,
          value,
        };

        return {
          ...prev,
          itemWidths: newItemWidths,
        };
      });
    },
    []
  );

  return (
    <View
      className="flex-col"
      style={{ height: containerHeight, position: "relative" }}
    >
      <View className="flex-col" style={{ height: containerRowHeight }}>
        {Array.from({ length: state.totalRows }).map((_item, index) => (
          <View
            className="border-border border-b-2"
            style={{ height: rowHeight }}
            key={`row-separator-${index}`}
          />
        ))}
      </View>

      <View
        style={{ height: containerRowHeight }}
        className="absolute bottom-0 left-0 flex-row flex-wrap justify-center"
      >
        {items.map((item, i) => {
          const itemWidth = state.itemWidths.find((item) => item.index === i);

          return (
            <React.Fragment key={`${i}-${item.value}`}>
              <Button
                onPress={handlePressItem({
                  number: item.number,
                  index: i,
                  width: 0,
                  value: item.value,
                })}
                style={[animationStyles[i], { height: itemHeight }]}
                className="z-10"
                onLayout={(event) => {
                  const width = event.nativeEvent.layout.width;

                  if (state.isLoading) {
                    handleItemLayout(i, item.number, width, item.value);
                  }
                }}
                size="lg"
                variant="outline"
              >
                <Text className="text-lg">{item.value}</Text>
              </Button>

              {itemWidth && (
                <View
                  style={{
                    width: itemWidth.width - 1,
                    height: itemHeight,
                    left: state.originalPositions.xPositions[i],
                    top: state.originalPositions.yPositions[i],
                  }}
                  className="border-border absolute rounded-lg border"
                />
              )}
            </React.Fragment>
          );
        })}
      </View>
    </View>
  );
};

const calculateExistingRow = ({
  containerWidth,
  itemsWidths,
  spacing,
}: {
  containerWidth: number;
  itemsWidths: Array<SorterItemData>;
  spacing: number;
}) => {
  let totalRow = 0;

  let rowWidth = 0;

  const data: Array<Array<SorterItemData>> = [];

  itemsWidths.forEach((item) => {
    rowWidth += item.width + spacing;

    if (rowWidth >= containerWidth) {
      rowWidth = item.width;
      totalRow += 1;
    }

    data[totalRow] = [
      ...(data[totalRow] ?? []),
      { ...item, width: item.width + spacing },
    ];
  });

  return { totalRow, data };
};

const calculateItemsPositions = ({
  itemWidths,
  spacing,
  containerWidth,
  ySpacing,
  xSpacing,
  itemHeight,
}: {
  itemWidths: Array<number>;
  spacing: number;
  containerWidth: number;
  ySpacing: number;
  xSpacing: number;
  itemHeight: number;
}) => {
  const xPositions: number[] = [];

  const yPositions: number[] = [];

  let x = xSpacing;

  let y = ySpacing;

  let totalRow = 1;

  for (let i = 0; i < itemWidths.length; i++) {
    const width = itemWidths[i];

    if (x + width > containerWidth) {
      x = xSpacing;
      y += itemHeight + spacing;
      totalRow += 1;
    }

    xPositions.push(x);

    yPositions.push(y);

    x += width + spacing;
  }

  return { xPositions, yPositions, totalRow };
};

export default ItemSorter;
