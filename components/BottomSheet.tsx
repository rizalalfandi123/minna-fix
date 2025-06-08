import { BottomSheetModal, BottomSheetModalProps } from "@gorhom/bottom-sheet";
import { useTheme } from "@react-navigation/native";
import { remapProps } from "nativewind";
import React from "react";

export type BottomSheetProps = BottomSheetModalProps;

const BottomSheet = React.forwardRef((props: BottomSheetProps, ref: React.Ref<BottomSheetModal>) => {
    const { colors } = useTheme();

    return (
        <BottomSheetModal
            {...props}
            ref={ref}
            backgroundStyle={{
                backgroundColor: colors.background,
                borderTopWidth: 1,
                borderRadius: 0,
                marginHorizontal: 0,
                borderTopColor: colors.border,
            }}
            handleIndicatorStyle={{
                backgroundColor: "red",
            }}
        />
    );
});

export default BottomSheet;
