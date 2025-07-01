import React from "react";
import { GestureResponderEvent, PressableProps, ScrollView, View } from "react-native";
import { AnimatedPressable } from "~/components/Animations";
import CircularProgress from "~/components/CircularProgress";
import { shuffleArray } from "~/helpers/array";
import { triggerHaptic } from "~/helpers/triggerHaptic";
import useScreenSize from "~/helpers/useScreenSize";
import { useButtonScaleAnimation } from "~/hooks/useButtonScaleAnimation";
import { useScreenMode } from "~/lib/useScreenMode";
import Check from "../icons/Check";
import { stepCircleOffset, stepCirclePadding, stepCircleSize } from "~/lib/constants/sizes";
import { cn } from "~/lib/utils";
import Lock from "../icons/Lock";
import Help from "../icons/Help";

export type StepBlock<T extends { id: string; isComplete: boolean }> =
  | { type: "BLOCK"; isActive?: boolean; block: Array<T> }
  | { type: "INFORMATION"; isActive?: boolean; id: string };

export type StepsPageContentProps<T extends { id: string; isComplete: boolean }> = {
  levels: Array<StepBlock<T>>;
  onPressItem: (item: { type: StepBlock<T>["type"]; id: string }) => void;
};

export function isInformation<T extends { id: string; isComplete: boolean }>(
  stepBlock: StepBlock<T>
): stepBlock is Extract<StepBlock<T>, { type: "INFORMATION" }> {
  return stepBlock.type === "INFORMATION";
}

const iconSize = stepCircleSize * 0.3;

const StepsPageContent = <T extends { id: string; isComplete: boolean }>(props: StepsPageContentProps<T>) => {
  const { unitLevelListHeight } = useScreenSize();

  return (
    <ScrollView
      style={{
        height: unitLevelListHeight,
      }}
      className="bg-background"
    >
      <View style={{ height: props.levels.length * (stepCircleSize + stepCirclePadding / 2) }} className="flex-col justify-between items-center">
        {props.levels.map((item, i) => {
          if (isInformation(item)) {
            return (
              <InformationBlock
                key={i}
                onPress={() => {
                  props.onPressItem({ type: "INFORMATION", id: item.id });
                }}
                disabled={!item.isActive}
                index={i}
              />
            );
          }

          const progress = (item.block.filter((subItem) => subItem.isComplete).length / item.block.length) * 100;

          return (
            <ProgressUnitLevel
              key={i}
              disabled={!item.isActive}
              progress={progress}
              index={i}
              onPress={() => {
                let selectedItem = item.block.find((level) => !level.isComplete);

                if (!selectedItem) {
                  selectedItem = shuffleArray(item.block)[0];
                }

                props.onPressItem({ type: "BLOCK", id: selectedItem.id });
              }}
            />
          );
        })}
      </View>
    </ScrollView>
  );
};

export const InformationBlock: React.FunctionComponent<Record<"index", number> & PressableProps> = React.memo(
  ({ index, onPress, disabled = true, ...props }) => {
    const scaleAnimation = useButtonScaleAnimation();

    const { contentWidth } = useScreenSize();

    const { colors } = useScreenMode();

    const { horizontalOffset, verticalPosition } = React.useMemo(() => {
      const horizontalStep = stepCircleSize * 0.4;

      const patternWidth = (stepCircleOffset - 1) * horizontalStep + stepCircleSize;

      const centerOffset = (contentWidth - patternWidth) / 2;

      const segmentPosition = index % ((stepCircleOffset - 1) * 2);

      const movingRight = segmentPosition < stepCircleOffset;

      const horizontalOffset = centerOffset + (movingRight ? segmentPosition * horizontalStep : (stepCircleOffset * 2 - 2 - segmentPosition) * horizontalStep);

      const verticalPosition = index * (stepCircleSize + stepCirclePadding / 2);

      return { horizontalOffset, verticalPosition };
    }, [index, contentWidth]);

    const handlePress = React.useCallback(
      (e: GestureResponderEvent) => {
        if (disabled) return;

        scaleAnimation.animate();

        triggerHaptic();

        onPress?.(e);
      },
      [disabled, scaleAnimation, onPress]
    );

    return (
      <View
        className="absolute p-3"
        style={{
          top: verticalPosition,
          left: horizontalOffset,
          width: stepCircleSize,
          height: stepCircleSize,
        }}
      >
        <AnimatedPressable
          style={[scaleAnimation.animatedStyle]}
          onPress={handlePress}
          className={cn("w-full h-full rounded-full bg-primary justify-center items-center", !disabled ? "opacity-100" : "opacity-50")}
        >
          {disabled ? (
            <Lock width={iconSize} color={colors["primary-foreground"]} height={iconSize} />
          ) : (
            <Help width={iconSize - 4} color={colors["primary-foreground"]} height={iconSize - 4} />
          )}
        </AnimatedPressable>
      </View>
    );
  }
);

export const ProgressUnitLevel: React.FunctionComponent<Record<"index" | "progress", number> & PressableProps> = React.memo(
  ({ index, onPress, disabled = true, progress, ...props }) => {
    const scaleAnimation = useButtonScaleAnimation();

    const { colors } = useScreenMode();

    const { contentWidth } = useScreenSize();

    const strokeWidth = 8;

    const { horizontalOffset, verticalPosition } = React.useMemo(() => {
      const horizontalStep = stepCircleSize * 0.4;

      const patternWidth = (stepCircleOffset - 1) * horizontalStep + stepCircleSize;

      const centerOffset = (contentWidth - patternWidth) / 2;

      const segmentPosition = index % ((stepCircleOffset - 1) * 2);

      const movingRight = segmentPosition < stepCircleOffset;

      const horizontalOffset = centerOffset + (movingRight ? segmentPosition * horizontalStep : (stepCircleOffset * 2 - 2 - segmentPosition) * horizontalStep);

      const verticalPosition = index * (stepCircleSize + stepCirclePadding / 2);

      return { horizontalOffset, verticalPosition };
    }, [index, contentWidth]);

    const isComplete = progress >= 100;

    const progressColor = disabled || isComplete ? colors.background : colors.primary;

    const innerCircleSize = stepCircleSize - strokeWidth * 3;

    const handlePress = React.useCallback(
      (e: GestureResponderEvent) => {
        if (disabled) return;

        scaleAnimation.animate();
        triggerHaptic();
        onPress?.(e);
      },
      [disabled, scaleAnimation, onPress]
    );

    return (
      <View
        className="absolute"
        style={{
          top: verticalPosition,
          left: horizontalOffset,
          width: stepCircleSize + strokeWidth,
          height: stepCircleSize + strokeWidth,
        }}
      >
        <CircularProgress radius={stepCircleSize / 2} progress={progress} strokeWidth={strokeWidth} progressColor={progressColor} strokeColor={progressColor}>
          <AnimatedPressable
            style={[
              scaleAnimation.animatedStyle,
              {
                height: innerCircleSize,
                width: innerCircleSize,
                borderRadius: stepCircleSize / 2,
              },
            ]}
            className={cn("absolute justify-center items-center bg-primary", !disabled ? "opacity-100" : "opacity-50")}
            onPress={handlePress}
            {...props}
          >
            {isComplete && <Check width={iconSize} color={colors["primary-foreground"]} height={iconSize} />}
            {disabled && <Lock width={iconSize} color={colors["primary-foreground"]} height={iconSize} />}
          </AnimatedPressable>
        </CircularProgress>
      </View>
    );
  }
);

export default StepsPageContent;
