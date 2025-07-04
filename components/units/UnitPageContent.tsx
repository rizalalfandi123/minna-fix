import { useRouter } from "expo-router";
import { FlatList, View } from "react-native";
import { AnimatedPressable } from "~/components/Animations";
import { triggerHaptic } from "~/helpers/triggerHaptic";
import { useButtonScaleAnimation } from "~/hooks/useButtonScaleAnimation";
import { Text } from "../ui/text";
import { useGetUnits } from "~/services/queries/unitQueries";
import { useTranslation } from "react-i18next";
import { Unit } from "~/types";


const UnitItem: React.FC<{ unit: Unit }> = ({ unit }) => {
  const { t } = useTranslation();

  const scaleAnimation = useButtonScaleAnimation();

  const router = useRouter();

  const handleToUnit = () => {
    scaleAnimation.animate();

    triggerHaptic();

    setTimeout(() => {
      router.navigate({ pathname: "/units/[id]", params: { id: unit.id } });
    }, 200);
  };

  return (
    <AnimatedPressable
      onPress={handleToUnit}
      style={[scaleAnimation.animatedStyle]}
      className="h-24 w-full justify-center rounded-xl border-2 border-border bg-card p-6 shadow-sm"
    >
      <Text className="font-sans-semibold text-2xl text-card-foreground">{t("unit_name", { name: `${unit.number}` })}</Text>
    </AnimatedPressable>
  );
};

const UnitPageContent = () => {

  const { data: units = [] } = useGetUnits();

  return (
    <View className="flex-1 bg-background py-4">
      <FlatList<Unit>
        data={units}
        keyExtractor={(item) => item.id}
        contentContainerClassName="px-2 pb-4"
        renderItem={({ item }) => <UnitItem unit={item} />}
        ItemSeparatorComponent={() => <View className="h-4" />}
      />
    </View>
  );
};

export default UnitPageContent;
