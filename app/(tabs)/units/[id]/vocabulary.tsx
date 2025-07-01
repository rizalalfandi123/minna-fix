import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import StepsPageContent, { isInformation, StepBlock } from "~/components/units/StepsPageContent";
import { chunkArray } from "~/helpers/array";
import { DetailUnitBlock, useGetDetailUnitBlocks } from "~/services/queries/unitLevels";
import useUnitProgress from "~/services/queries/unitProgressQueries";

type TVocabularyBlock = StepBlock<DetailUnitBlock["unit_levels"][number] & { isComplete: boolean }>;

const VocabularyPage = () => {
  const params = useLocalSearchParams<{ id: string }>();

  const router = useRouter();

  const { data: unitProgress = [] } = useUnitProgress();

  const { data: unitBlocks = [] } = useGetDetailUnitBlocks(params.id);

  const data = React.useMemo(() => {
    const buildVocabularyBlock = (data: Array<Array<DetailUnitBlock["unit_levels"][number] & { isComplete: boolean }>>) => {
      const result = data.map((item) => {
        const block: TVocabularyBlock = { type: "BLOCK", block: item };
        return block;
      });

      return result;
    };

    const vocabularyBlocks = unitBlocks.map((block) => {
      const chunk = chunkArray(
        block.unit_levels.map((level) => ({ ...level, isComplete: unitProgress.some((progress) => progress.unit_level_id === level.id) })),
        3
      );

      return { id: block.id, blocks: buildVocabularyBlock(chunk) };
    });

    const blocks: Array<TVocabularyBlock> = vocabularyBlocks.flatMap(({ blocks, id }, index) => {
      if (index === 0) {
        return [{ type: "INFORMATION", id }, ...blocks, { type: "INFORMATION", id: vocabularyBlocks[index + 1].id }];
      }

      if (index < vocabularyBlocks.length - 1) {
        return [...blocks, { type: "INFORMATION", id: vocabularyBlocks[index + 1].id }];
      }

      return [...blocks];
    });

    const stepBlocks = blocks.map((block, index) => {
      let isActive = false;

      if (index <= 1) {
        isActive = true;
      } else {
        const blockBefore1 = blocks[index - 1];

        const blockBefore2 = blocks[index - 2];

        if (isInformation(block) && !isInformation(blockBefore1)) {
          isActive = blockBefore1.block.every((level) => level.isComplete);
        }

        if (!isInformation(block) && !isInformation(blockBefore1)) {
          isActive = blockBefore1.block.every((level) => level.isComplete);
        }

        if (!isInformation(block) && isInformation(blockBefore1) && !isInformation(blockBefore2)) {
          isActive = blockBefore2.block.every((level) => level.isComplete);
        }
      }

      return { ...block, isActive: isActive };
    });

    return stepBlocks;
  }, [unitProgress, unitBlocks]);

  const handlePressBlock = (data: { id: string; type: "BLOCK" | "INFORMATION" }) => {
    if (data.type === "BLOCK") {
      router.navigate({ pathname: "/learn/vocabulary/[id]", params: { id: data.id } });
    }

    if (data.type === "INFORMATION") {
      router.navigate({ pathname: "/learn/information" });
    }
  };

  return <StepsPageContent onPressItem={handlePressBlock} levels={data} />;
};

export default VocabularyPage;
