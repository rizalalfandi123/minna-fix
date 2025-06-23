import React from "react";
import { View } from "react-native";
import { AnimatedPressable } from "~/components/Animations";
import ArrowBack from "~/components/icons/ArrowBack";
import { triggerHaptic } from "~/helpers/triggerHaptic";
import { useButtonScaleAnimation } from "~/hooks/useButtonScaleAnimation";
import { pageHeaderHeight } from "~/lib/constants/sizes";
import { Text } from "./ui/text";
import { useScreenMode } from "~/lib/useScreenMode";

const PageHeader: React.FC<{ onBack: () => void, title: string }> = ({ onBack, title }) => {
    const { colors } = useScreenMode();

    const scaleAnimation = useButtonScaleAnimation({ pressedScale: 0.75 });

    const handleBack = () => {
        scaleAnimation.animate();

        triggerHaptic();

        setTimeout(() => {
            onBack();
        }, 200);
    };

    return (
        <View style={{ height: pageHeaderHeight }} className="flex-row justify-center bg-background">
            <AnimatedPressable onPress={handleBack} style={[scaleAnimation.animatedStyle]} className="h-full justify-center pl-1 pr-4">
                <ArrowBack color={colors.primary} width={28} height={28} />
            </AnimatedPressable>

            <View className="h-full flex-1 justify-center">
                <Text className="font-sans-medium text-lg">{title}</Text>
            </View>
        </View>
    );
};

export default PageHeader;
