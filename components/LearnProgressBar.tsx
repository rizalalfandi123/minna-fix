import React from "react";
import { Pressable, View, ViewProps } from "react-native";
import Close from "~/components/icons/Close";
import Love from "~/components/icons/Love";
import ProgressBar from "~/components/ProgressBar";
import { cn } from "~/lib/utils";
import { Text } from "./ui/text";
import { useScreenMode } from "~/lib/useColorScheme";

export type LearnProgressBarProps = {
    size?: number;
    handleBack: () => void;
    progress: number;
    health: number;
} & ViewProps;

const LearnProgressBar: React.FC<LearnProgressBarProps> = ({ size = 32, handleBack, progress, health, className, ...viewProps }) => {
    const { colors } = useScreenMode();

    return (
        <View className={cn("h-14 w-full flex-row items-center justify-center gap-2", className)} {...viewProps}>
            <Pressable onPress={handleBack}>
                <Close color={colors.primary} style={{ opacity: 0.8 }} width={size} height={size} />
            </Pressable>

            <View className="flex-1">
                <ProgressBar progress={progress} />
            </View>

            <View className="relative items-center justify-center">
                <Text
                    className="absolute text-foreground font-sans-bold"
                    style={{
                        fontSize: size / 2.5,
                    }}
                >
                    {health}
                </Text>

                <Love color={colors.primary} style={{ opacity: 0.8 }} width={size} height={size} />
            </View>
        </View>
    );
};

export default LearnProgressBar;
