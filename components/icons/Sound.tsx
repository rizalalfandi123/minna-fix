import React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
import { placeholderColor } from "~/lib/constants/appTheme";

const Sound = React.forwardRef(({ color = placeholderColor, ...props }: SvgProps, ref: React.Ref<Svg>) => {
    return (
        <Svg viewBox="0 0 24 24" fill="none" {...props} ref={ref}>
            <Path
                fill={color}
                d="M17.725 17.625H12.05L9.225 20.45q-.575.575-1.412.575T6.4 20.45l-2.825-2.825Q3 17.05 3 16.2t.575-1.425l2.8-2.8V6.3zm-4.825-2L8.375 11.1v1.7l-3.4 3.4L7.8 19.025l3.4-3.4zM7.225 4.375q2.675-1.7 5.788-1.362T18.375 5.6t2.588 5.363T19.6 16.75l-1.45-1.45q1.125-2.05.788-4.337T16.95 7.025t-3.937-1.987t-4.338.787zm2.95 2.95Q11.6 6.9 13.05 7.15t2.5 1.3t1.288 2.488t-.188 2.862l-1.7-1.7q0-.625-.187-1.212t-.613-1.013q-.45-.45-1.037-.65t-1.238-.2zM8.95 15.05"
            />
        </Svg>
    );
});

export default Sound;
