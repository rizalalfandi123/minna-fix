import { BottomSheetModal, BottomSheetModalProps } from "@gorhom/bottom-sheet";
import React from "react";
import { useScreenMode } from "~/lib/useColorScheme";

export type BottomSheetProps = BottomSheetModalProps;

const BottomSheet = React.forwardRef((props: BottomSheetProps, ref: React.Ref<BottomSheetModal>) => {
    const { themeValue } = useScreenMode();

    return (
        <BottomSheetModal
            {...props}
            ref={ref}
            backgroundStyle={{
                backgroundColor: themeValue.colors.background,
                borderTopWidth: 1,
                borderRadius: 0,
                marginHorizontal: 0,
                borderTopColor: themeValue.colors.border,
            }}
            handleIndicatorStyle={{
                backgroundColor: "red",
            }}
        />
    );
});

export default BottomSheet;
