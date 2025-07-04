import { type StyleProp, View, type ViewStyle } from "react-native";

interface PlaceholderProps {
  style: StyleProp<ViewStyle>;
}

export default function Placeholder({ style }: PlaceholderProps) {
  return <View style={[style]} className="bg-input rounded-lg" />;
}
