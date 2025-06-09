import { BottomSheetModal, BottomSheetModalProps } from "@gorhom/bottom-sheet";
import React from "react";
import { useScreenMode } from "~/lib/useColorScheme";

export type BottomSheetProps = BottomSheetModalProps;

const BottomSheet = React.forwardRef((props: BottomSheetProps, ref: React.Ref<BottomSheetModal>) => {
    const { colors } = useScreenMode();

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
