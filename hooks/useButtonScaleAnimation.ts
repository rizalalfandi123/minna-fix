import { useSharedValue, useAnimatedStyle, withSequence, withSpring } from "react-native-reanimated";
import { SpringConfig } from "react-native-reanimated/lib/typescript/animation/springUtils";

type ButtonScaleAnimationOptions = {
    pressedScale?: number;
    springConfig?: SpringConfig;
};

export const useButtonScaleAnimation = (config?: ButtonScaleAnimationOptions) => {
    const { pressedScale = 0.9, springConfig = { stiffness: 200 } } = config || {};

    const scale = useSharedValue<number>(1);

    const animate = () => {
        scale.value = withSequence(withSpring(pressedScale, springConfig), withSpring(1, springConfig));
    };

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    return {
        animate,
        animatedStyle,
    };
};
