import { useTheme } from "@react-navigation/native";
import React from "react";
import { ActivityIndicator, View, ViewProps } from "react-native";
import { cn } from "~/lib/utils";

export interface SpinnerProps extends ViewProps {
    size?: "small" | "large";
}

const Spinner: React.FC<SpinnerProps> = ({ size = "large", className, ...rest }) => {
    const { colors } = useTheme();

    return (
        <View className={cn("flex items-center justify-center", className)} {...rest}>
            <ActivityIndicator size={size} color="red" />
        </View>
    );
};

export default Spinner;
