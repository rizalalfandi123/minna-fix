import React from "react";
import { View } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated";
import { cn } from "~/lib/utils";

interface ProgressBarProps {
    progress: number;
    containerClassName?: string;
    barClassName?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, barClassName, containerClassName }) => {
    const animatedProgress = useSharedValue<number>(progress);

    React.useEffect(() => {
        if (progress !== animatedProgress.value) {
            animatedProgress.value = withSpring(progress, {
                damping: 6,
                stiffness: 150,
            });
        }
    }, [progress]);

    const animatedStyle = useAnimatedStyle(() => ({
        width: `${animatedProgress.value}%`,
    }));

    return (
        <View className={cn("h-3 w-full overflow-hidden rounded-full bg-primary/20", containerClassName)}>
            <Animated.View style={[animatedStyle]} className={cn("h-full rounded-full bg-primary", barClassName)} />
        </View>
    );
};

export default ProgressBar;
