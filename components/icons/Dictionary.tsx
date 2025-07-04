import React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
import { placeholderColor } from "~/lib/constants/appTheme";

export default function Dictionary({ color = placeholderColor, ...props }: SvgProps) {
    return (
        <Svg viewBox="0 0 24 24" fill="none" {...props}>
            <Path
                d="M6 22q-.825 0-1.412-.587T4 20V4q0-.825.588-1.412T6 2h12q.825 0 1.413.588T20 4v16q0 .825-.587 1.413T18 22zm0-2h12V4h-2v7l-2.5-1.5L11 11V4H6zm0 0V4zm5-9l2.5-1.5L16 11l-2.5-1.5z"
                fill={color}
            />
        </Svg>
    );
}
