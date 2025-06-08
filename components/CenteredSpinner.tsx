import React from "react";
import { View } from "react-native";
import Spinner, { SpinnerProps } from "./Spinner";
import { cn } from "~/lib/utils";

const CenteredSpinner: React.FC<SpinnerProps> = ({ size = "large", className, ...rest }) => {
    return (
        <View className={cn("flex-1 items-center justify-center bg-background", className)} {...rest}>
            <Spinner size={size} />
        </View>
    );
};

export default CenteredSpinner;
