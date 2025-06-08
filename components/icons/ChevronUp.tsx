import React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
import { placeholderColor } from "~/lib/constants/appTheme";

export default function ChevronUp({ color = placeholderColor, ...props }: SvgProps) {
    return (
        <Svg viewBox="0 0 24 24" fill="none" {...props}>
            <Path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6l-6 6z" fill={color} />
        </Svg>
    );
}
