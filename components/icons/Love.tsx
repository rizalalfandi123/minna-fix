import React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
import { placeholderColor } from "~/lib/constants/appTheme";

const Love = React.forwardRef(({ color = placeholderColor, ...props }: SvgProps, ref: React.Ref<Svg>) => {
    return (
        <Svg viewBox="0 0 24 24" fill="none" {...props} ref={ref}>
            <Path
                fill={color}
                d="M12 20.325q-.35 0-.712-.125t-.638-.4l-1.725-1.575q-2.65-2.425-4.788-4.812T2 8.15Q2 5.8 3.575 4.225T7.5 2.65q1.325 0 2.5.562t2 1.538q.825-.975 2-1.537t2.5-.563q2.35 0 3.925 1.575T22 8.15q0 2.875-2.125 5.275T15.05 18.25l-1.7 1.55q-.275.275-.637.4t-.713.125"
            />
        </Svg>
    );
});

export default Love;
