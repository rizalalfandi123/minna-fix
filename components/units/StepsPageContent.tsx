import { useTheme } from "@react-navigation/native";
import React from "react";
import {
  GestureResponderEvent,
  PressableProps,
  ScrollView,
  View,
} from "react-native";
import { AnimatedPressable } from "~/components/Animations";
import CircularProgress from "~/components/CircularProgress";
import { triggerHaptic } from "~/helpers/triggerHaptic";
import { useButtonScaleAnimation } from "~/hooks/useButtonScaleAnimation";
import { contentWidth, learnUnitHeight } from "~/lib/constants/sizes";

const StepsPageContent = <T extends { id: string }>(props: {
  units: T[];
  onPressUnit: (unit: T) => void;
}) => {
  const padding = 44;

  const circleSize = 92;

  const maxOffset = 3;

  const horizontalStep = circleSize * 0.4;

  const patternWidth = (maxOffset - 1) * horizontalStep + circleSize;

  const centerOffset = (contentWidth - patternWidth) / 2;

  const totalHeight =
    props.units.length * (circleSize + padding / 2) + circleSize;

  return (
    <View style={{ height: learnUnitHeight }}>
      <ScrollView
        contentContainerStyle={{
          minHeight: totalHeight,
          paddingBottom: 8,
        }}
        className="bg-background"
      >
        {props.units.map((item, i) => {
          const segmentPosition = i % ((maxOffset - 1) * 2);

          const movingRight = segmentPosition < maxOffset;

          const horizontalOffset =
            centerOffset +
            (movingRight
              ? segmentPosition * horizontalStep
              : (maxOffset * 2 - 2 - segmentPosition) * horizontalStep);

          const verticalPosition = i * (circleSize + padding / 2);

          return (
            <ProgressUnitLevel
              key={i}
              circleSize={circleSize}
              horizontalOffset={horizontalOffset}
              disabled={i !== 1}
              verticalPosition={verticalPosition}
              onPress={() => props.onPressUnit(item)}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export const ProgressUnitLevel: React.FunctionComponent<
  Record<"circleSize" | "verticalPosition" | "horizontalOffset", number> &
    PressableProps
> = ({
  circleSize,
  horizontalOffset,
  verticalPosition,
  onPress,
  disabled = true,
  id,
  ...props
}) => {
  const scaleAnimation = useButtonScaleAnimation();

  const { colors } = useTheme();

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
        strokeWidth={strokeWidth}
        progressColor={disabled ? "transparent" : colors.primary}
        strokeColor={disabled ? "transparent" : colors.primary}
      >
        <AnimatedPressable
          style={[
            scaleAnimation.animatedStyle,
            {
              height: circleSize - strokeWidth * 3,
              width: circleSize - strokeWidth * 3,
              backgroundColor: "red",
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
