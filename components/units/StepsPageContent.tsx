import React from "react";
import { GestureResponderEvent, PressableProps, ScrollView, View } from "react-native";
import { AnimatedPressable } from "~/components/Animations";
import CircularProgress from "~/components/CircularProgress";
import { shuffleArray } from "~/helpers/array";
import { triggerHaptic } from "~/helpers/triggerHaptic";
import useScreenHeight from "~/helpers/useScreenHeight";
import { useButtonScaleAnimation } from "~/hooks/useButtonScaleAnimation";
import { contentWidth } from "~/lib/constants/sizes";
import { useScreenMode } from "~/lib/useScreenMode";

export type StepsBlock<T extends { id: string; isComplete: boolean }> = Array<{ block: Array<T>; isActive: boolean }>;

const StepsPageContent = <T extends { id: string; isComplete: boolean }>(props: { levels: StepsBlock<T>; onPressItem: (item: T) => void }) => {
  const { learnUnitHeight } = useScreenHeight();

  const padding = 44;

  const circleSize = 92;

  const maxOffset = 3;

  const horizontalStep = circleSize * 0.4;

  const patternWidth = (maxOffset - 1) * horizontalStep + circleSize;

  const centerOffset = (contentWidth - patternWidth) / 2;

  const totalHeight = props.levels.length * (circleSize + padding / 2) + circleSize;

  return (
    <View style={{ height: learnUnitHeight }}>
      <ScrollView
        contentContainerStyle={{
          minHeight: totalHeight,
          paddingBottom: 8,
        }}
        className="bg-background"
      >
        {props.levels.map((item, i) => {
          const segmentPosition = i % ((maxOffset - 1) * 2);

          const progress = (item.block.filter((subItem) => subItem.isComplete).length / item.block.length) * 100;

          const movingRight = segmentPosition < maxOffset;

          const horizontalOffset = centerOffset + (movingRight ? segmentPosition * horizontalStep : (maxOffset * 2 - 2 - segmentPosition) * horizontalStep);

          const verticalPosition = i * (circleSize + padding / 2);

          return (
            <ProgressUnitLevel
              key={i}
              circleSize={circleSize}
              horizontalOffset={horizontalOffset}
              disabled={!item.isActive}
              progress={progress}
              verticalPosition={verticalPosition}
              onPress={() => {
                let selectedItem = item.block.find((level) => !level.isComplete);

                if (!selectedItem) {
                  selectedItem = shuffleArray(item.block)[0];
                }

                props.onPressItem(selectedItem);
              }}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export const ProgressUnitLevel: React.FunctionComponent<
  Record<"circleSize" | "verticalPosition" | "horizontalOffset" | "progress", number> & PressableProps
> = ({ circleSize, horizontalOffset, verticalPosition, onPress, disabled = true, id, progress, ...props }) => {
  const scaleAnimation = useButtonScaleAnimation();

  const { colors } = useScreenMode();

  const strokeWidth = 8;

  const handlePress = (e: GestureResponderEvent) => {
    if (disabled) {
      return;
    }

    scaleAnimation.animate();

    triggerHaptic();

    onPress?.(e);
  };

  return (
    <View
      className="absolute"
      style={{
        top: verticalPosition,
        left: horizontalOffset,
        width: circleSize + strokeWidth,
        height: circleSize + strokeWidth,
      }}
    >
      <CircularProgress
        radius={circleSize / 2}
        progress={progress}
        strokeWidth={strokeWidth}
        progressColor={disabled ? colors.background : colors.primary}
        strokeColor={disabled ? colors.background : colors.primary}
      >
        <AnimatedPressable
          style={[
            scaleAnimation.animatedStyle,
            {
              height: circleSize - strokeWidth * 3,
              width: circleSize - strokeWidth * 3,
              backgroundColor: colors.primary,
              opacity: 0.5,
              borderRadius: circleSize / 2,
            },
          ]}
          className="absolute"
          onPress={handlePress}
          {...props}
        />
      </CircularProgress>
    </View>
  );
};

export default StepsPageContent;
