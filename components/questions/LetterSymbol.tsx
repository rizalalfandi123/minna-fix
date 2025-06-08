import React from "react";
import Sound from "../icons/Sound";
import { useButtonScaleAnimation } from "~/hooks/useButtonScaleAnimation";
import { AnimatedPressable } from "../Animations";
import { triggerHaptic } from "~/helpers/triggerHaptic";
import speak from "~/helpers/speak";
import { useTheme } from "@react-navigation/native";
import { Text } from "../ui/text";

const LetterSymbol: React.FunctionComponent<{ symbol: string; withHint?: boolean }> = ({ symbol, withHint = true }) => {
    const { colors } = useTheme();

    const scaleAnimation = useButtonScaleAnimation();

    const handlePress = () => {
        if (!withHint) {
            return;
        }

        triggerHaptic();

        scaleAnimation.animate();

        speak(symbol, "ja", { rate: 0.8 });
    };

    return (
        <AnimatedPressable
            onPress={handlePress}
            style={[scaleAnimation.animatedStyle]}
            className="relative h-44 w-44 items-center justify-center rounded-2xl bg-primary"
        >
            <Text className="font-jp-bold text-8xl text-primary-foreground">{symbol}</Text>

            {withHint && (
                <Sound style={{ position: "absolute", bottom: 4, left: 4, opacity: 0.9 }} color="red" width={20} height={20} />
            )}
        </AnimatedPressable>
    );
};

export default LetterSymbol;
