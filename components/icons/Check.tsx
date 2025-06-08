import Svg, { Path, SvgProps } from "react-native-svg";
import { placeholderColor } from "~/lib/constants/appTheme";

export default function Check({ color = placeholderColor, ...props }: SvgProps) {
    return (
        <Svg viewBox="0 0 24 24" fill="none" {...props}>
            <Path d="m9.55 18l-5.7-5.7l1.425-1.425L9.55 15.15l9.175-9.175L20.15 7.4z" fill={color} />
        </Svg>
    );
}
