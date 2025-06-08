import { remapProps } from "nativewind";
import { ScrollView, ScrollViewProps } from "react-native";

const PageContainer: React.FC<ScrollViewProps> = ({ style, contentContainerStyle, ...props }) => {
    return <ScrollView style={style} contentContainerStyle={contentContainerStyle} {...props} />;
};

remapProps(PageContainer, {
    className: "style",
    contentContainerClassName: "contentContainerStyle",
});

export default PageContainer;
