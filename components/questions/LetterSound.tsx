import React from "react";
import Sound from "../icons/Sound";
import { useButtonScaleAnimation } from "~/hooks/useButtonScaleAnimation";
import { AnimatedPressable } from "../Animations";
import { triggerHaptic } from "~/helpers/triggerHaptic";
import speak from "~/helpers/speak";
import { View } from "react-native";
import SlowSound from "../icons/SlowSound";
import { useScreenMode } from "~/lib/useScreenMode";

const LetterSound: React.FunctionComponent<{ symbol: string }> = ({ symbol }) => {
    const { colors } = useScreenMode();

    const mainSoundAnimation = useButtonScaleAnimation();

    const secondSoundAnimation = useButtonScaleAnimation();

    const handleMainSound = () => {
        triggerHaptic();

        mainSoundAnimation.animate();

        speak(symbol, "ja", { rate: 1 });
    };

    const handleSecondSound = () => {
        triggerHaptic();

        secondSoundAnimation.animate();

        speak(symbol, "ja", { rate: 0.5 });
    };

    return (
        <View className="w-full flex-row items-center justify-center gap-6">
            <AnimatedPressable
                onPress={handleMainSound}
                style={[mainSoundAnimation.animatedStyle]}
                className="relative h-36 w-36 items-center justify-center rounded-2xl bg-accent/50 border-2 border-border"
            >
                <Sound color={colors["accent-foreground"]} width={40} height={40} />
            </AnimatedPressable>

            <AnimatedPressable
                onPress={handleSecondSound}
                style={[secondSoundAnimation.animatedStyle]}
                className="relative h-20 w-20 items-center justify-center rounded-2xl bg-accent/50 border-2 border-border"
            >
                <SlowSound color={colors["accent-foreground"]} width={28} height={28} />
            </AnimatedPressable>
        </View>
    );
};

export default LetterSound;
