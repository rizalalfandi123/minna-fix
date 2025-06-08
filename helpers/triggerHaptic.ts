import * as Haptics from "expo-haptics";

export const triggerHaptic = (type: "light" | "medium" | "heavy" = "medium") => {
    switch (type) {
        case "light":
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            break;
        case "medium":
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            break;
        case "heavy":
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
            break;
    }
};
