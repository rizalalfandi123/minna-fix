import React from "react";
import { View, ViewProps } from "react-native";
import { useButtonScaleAnimation } from "~/hooks/useButtonScaleAnimation";
import { AnimatedPressable } from "../Animations";

export type BorderedViewProps = {
    childStyle?: ViewProps["style"];
    size: Record<"width" | "height" | "radius", number>;
    onPress?: () => void;
} & ViewProps;

const BorderedView: React.FunctionComponent<BorderedViewProps> = ({ onPress, children, style, childStyle, size, ...props }) => {
    const scaleAnimation = useButtonScaleAnimation({ pressedScale: 0.94 });

    const handlePress = () => {
        scaleAnimation.animate();

        onPress?.();
    };

    return (
        <AnimatedPressable
            onPress={handlePress}
            className="relative border-2 border-white bg-background"
            style={[
                {
                    height: size.height,
                    width: size.width,
                    borderRadius: size.radius,
                },
                scaleAnimation.animatedStyle,
                style,
            ]}
            {...props}
        >
            <View
                className="absolute left-0 top-0 w-full items-center justify-center bg-secondary"
                style={[
                    {
                        borderRadius: size.radius * (80 / 100),
                        height: size.height * (80 / 100),
                    },
                    childStyle,
                ]}
            >
                {children}
            </View>
        </AnimatedPressable>
    );
};

export default BorderedView;
