import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import Animated, { useAnimatedProps, useSharedValue, withTiming } from "react-native-reanimated";
import { Circle, G, Svg } from "react-native-svg";
import { useScreenMode } from "~/lib/useScreenMode";

export type CircularProgressProps = {
    progress?: number; // Now represents percentage (0-100)
    radius?: number;
    strokeWidth?: number;
    children?: React.ReactNode;
    style?: StyleProp<ViewStyle>;
    strokeColor?: string;
    progressColor?: string;
    animationDuration?: number;
};

const CircularProgress = ({
    progress = 50, // Default to 70% instead of 0.7
    radius = 50,
    strokeWidth = 8,
    children,
    style,
    progressColor,
    strokeColor,
    animationDuration = 1000,
}: CircularProgressProps) => {
    const { colors } = useScreenMode();

    const circumference = 2 * Math.PI * radius;

    const normalizedProgress = Math.min(Math.max(progress, 0), 100) / 100; // Convert to 0-1 range

    const progressValue = useSharedValue(0);

    React.useEffect(() => {
        progressValue.value = withTiming(normalizedProgress, { duration: animationDuration });
    }, [progress, animationDuration]);

    const animatedProps = useAnimatedProps(() => {
        return {
            strokeDashoffset: circumference * (1 - progressValue.value),
        };
    });

    return (
        <View className="items-center justify-center" style={[style]}>
            <Svg height={radius * 2 + strokeWidth} width={radius * 2 + strokeWidth}>
                <G rotation="-90" origin={`${radius + strokeWidth / 2}, ${radius + strokeWidth / 2}`}>
                    <Circle
                        cx={radius + strokeWidth / 2}
                        cy={radius + strokeWidth / 2}
                        r={radius}
                        stroke={strokeColor || colors.primary}
                        opacity={0.2}
                        strokeWidth={strokeWidth}
                        fill="transparent"
                    />

                    <AnimatedCircle
                        cx={radius + strokeWidth / 2}
                        cy={radius + strokeWidth / 2}
                        r={radius}
                        stroke={progressColor || colors.primary}
                        strokeWidth={strokeWidth}
                        strokeLinecap="round"
                        fill="transparent"
                        strokeDasharray={circumference}
                        animatedProps={animatedProps}
                    />
                </G>
            </Svg>

            {children}
        </View>
    );
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default CircularProgress;
