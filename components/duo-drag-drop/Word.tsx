import { useContext } from "react";
import { View, type StyleProp, type ViewStyle, type TextStyle } from "react-native";
import WordContext from "./WordContext";
import { Text } from "../ui/text";

export interface WordProps {
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export default function Word({ containerStyle, textStyle }: WordProps) {
  const { wordHeight, text, wordGap } = useContext(WordContext);

  return (
    <View
      style={[{ height: wordHeight, margin: wordGap, marginBottom: wordGap * 2 }, containerStyle]}
      className="mt-0 border-2 min-w-[32px] border-input bg-background web:hover:bg-accent web:hover:text-accent-foreground rounded-lg px-2 justify-center"
    >
      <Text style={[textStyle]} className="text-sm text-center" allowFontScaling={false} numberOfLines={1}>
        {text}
      </Text>
    </View>
  );
}
