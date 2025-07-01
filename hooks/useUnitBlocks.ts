import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";
import StepsPageContent, { isInformation, StepBlock } from "~/components/units/StepsPageContent";
import { chunkArray } from "~/helpers/array";
import { DetailUnitBlock, UnitBlockType, useGetDetailUnitBlocks } from "~/services/queries/unitLevels";
import useUnitProgress from "~/services/queries/unitProgressQueries";

type TVocabularyBlock = StepBlock<DetailUnitBlock["unit_levels"][number] & { isComplete: boolean }>;

const useUnitBlocks = ({type, unitId}: {unitId: string, type: UnitBlockType}) => {
  const { data: unitProgress = [] } = useUnitProgress();

  const { data: unitBlocks = [] } = useGetDetailUnitBlocks(unitId, type);

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

  return data
};

export default useUnitBlocks;
