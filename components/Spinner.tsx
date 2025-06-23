import React from "react";
import { ActivityIndicator, View, ViewProps } from "react-native";
import { useScreenMode } from "~/lib/useScreenMode";
import { cn } from "~/lib/utils";

export interface SpinnerProps extends ViewProps {
    size?: "small" | "large";
}

const Spinner: React.FC<SpinnerProps> = ({ size = "large", className, ...rest }) => {
    const { colors } = useScreenMode();

    return (
        <View className={cn("flex items-center justify-center", className)} {...rest}>
            <ActivityIndicator size={size} color={colors.accent} />
        </View>
    );
};

export default Spinner;
