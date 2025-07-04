import { type StyleProp, View, type ViewStyle } from "react-native";
import { cn } from "~/lib/utils";

interface LinesProps {
  numLines: number;
  containerHeight: number;
  lineHeight: number;
  lineStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  renderTopLine?: boolean;
}

export default function Lines(props: LinesProps) {
  const { containerHeight, containerStyle, numLines, lineHeight, lineStyle, renderTopLine = true } = props;
  const arr = new Array(numLines).fill(0);

  return (
    <View style={[{ height: containerHeight }, containerStyle]}>
      {arr.map((_, idx) => (
        <View
          key={`line.${idx}`}
          className={cn("bg-background border-b-2 border-border", { "border-t-2": idx === 0 && renderTopLine })}
          style={[{ height: lineHeight }, lineStyle]}
        />
      ))}
    </View>
  );
}
