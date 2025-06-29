import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import StepsPageContent, { StepsBlock } from "~/components/units/StepsPageContent";
import { chunkArray } from "~/helpers/array";
import { useGetDetailUnitLevels } from "~/services/queries/unitLevels";
import useUnitProgress from "~/services/queries/unitProgressQueries";
import { UnitLevel } from "~/types";

type TVocabularyLevel = UnitLevel & { isComplete: boolean };

const VocabularyPage = () => {
  const params = useLocalSearchParams<{ id: string }>();

  const { data: unitProgress = [] } = useUnitProgress();

  const { data: unitLevels = [] } = useGetDetailUnitLevels(params.id);

  const data: StepsBlock<TVocabularyLevel> = React.useMemo(() => {
    const blocks = chunkArray(
      unitLevels.map((level) => ({ ...level, isComplete: unitProgress.some((progress) => progress.unit_level_id === level.id) })),
      3
    );

    const stepBlocks = blocks.map((block, index) => {
      const isActive = index === 0 ? true : block.some((level) => level.isComplete) || (blocks[index - 1] ?? []).every((level) => level.isComplete);

      return { block, isActive: isActive };
    });

    return stepBlocks;
  }, [unitProgress, unitLevels]);

  const router = useRouter();

  const handlePressBlock = (unit: { id: string }) => {
    router.navigate({ pathname: "/learn/vocabulary/[id]", params: { id: unit.id } });
  };

  return <StepsPageContent<TVocabularyLevel> onPressItem={handlePressBlock} levels={data} />;
};

export default VocabularyPage;
