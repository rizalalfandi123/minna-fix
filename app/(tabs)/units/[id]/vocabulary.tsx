import { useRouter } from "expo-router";
import StepsPageContent from "~/components/units/StepsPageContent";

const data = Array.from({ length: 30 }, (_, i) => ({ id: `${i}` }));

const VocabularyPage = () => {
    const router = useRouter();

    const handlePressUnit = (unit: { id: string }) => {
        router.navigate({ pathname: "/learn/vocabulary/[id]", params: { id: unit.id } });
    };

    return <StepsPageContent<{ id: string }> onPressUnit={handlePressUnit} units={data} />;
};

export default VocabularyPage;
