import Svg, { G, Path, SvgProps } from "react-native-svg";
import { placeholderColor } from "~/lib/constants/appTheme";

export default function Brain({ color = placeholderColor, ...props }: SvgProps) {
    return (
        <Svg viewBox="0 0 24 24" fill="none" {...props}>
            <G fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                <Path d="M15.5 13a3.5 3.5 0 0 0-3.5 3.5v1a3.5 3.5 0 0 0 7 0v-1.8M8.5 13a3.5 3.5 0 0 1 3.5 3.5v1a3.5 3.5 0 0 1-7 0v-1.8"></Path>
                <Path d="M17.5 16a3.5 3.5 0 0 0 0-7H17"></Path>
                <Path d="M19 9.3V6.5a3.5 3.5 0 0 0-7 0M6.5 16a3.5 3.5 0 0 1 0-7H7"></Path>
                <Path d="M5 9.3V6.5a3.5 3.5 0 0 1 7 0v10"></Path>
            </G>
        </Svg>
    );
}
