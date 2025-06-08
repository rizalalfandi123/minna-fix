import { useRouter } from "expo-router";
import { FlatList, View } from "react-native";
import { AnimatedPressable } from "~/components/Animations";
import { triggerHaptic } from "~/helpers/triggerHaptic";
import { useButtonScaleAnimation } from "~/hooks/useButtonScaleAnimation";
import { Text } from "../ui/text";

const data = Array.from({ length: 40 }).map((_, i) => `Unit ${i + 1}`);

const UnitItem: React.FC<{ title: string }> = ({ title }) => {
    const scaleAnimation = useButtonScaleAnimation();

    const router = useRouter();

    const handleToUnit = () => {
        scaleAnimation.animate();

        triggerHaptic();

        setTimeout(() => {
            router.navigate({ pathname: "/units/[id]/vocabulary", params: { id: title } });
        }, 200);
    };

    return (
        <AnimatedPressable
            onPress={handleToUnit}
            style={[scaleAnimation.animatedStyle]}
            className="h-24 w-full justify-center rounded-xl border-2 border-border bg-card p-6 shadow-sm"
        >
            <Text className="font-sans-semibold text-2xl text-card-foreground">{title}</Text>
        </AnimatedPressable>
    );
};

const UnitPageContent = () => {
    return (
        <View className="flex-1 bg-background">
            <FlatList<string>
                data={data}
                keyExtractor={(item) => item}
                contentContainerClassName="px-2"
                renderItem={({ item }) => <UnitItem title={item} />}
                ItemSeparatorComponent={() => <View className="h-4" />}
            />
        </View>
    );
};

export default UnitPageContent;
