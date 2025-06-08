import Svg, { Path, SvgProps } from "react-native-svg";
import { placeholderColor } from "~/lib/constants/appTheme";

export default function ChevronDown({ color = placeholderColor, ...props }: SvgProps) {
    return (
        <Svg viewBox="0 0 24 24" fill="none" {...props}>
            <Path d="M7.41 8.58L12 13.17l4.59-4.59L18 10l-6 6l-6-6z" fill={color} />
        </Svg>
    );
}
