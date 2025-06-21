import { shuffleArray } from "~/helpers/array";
import { useGetLetterLevels } from "~/services/queries/letterLevelQueries";
import useLetterProgress from "~/services/queries/letterProgressQueries";

export const useNextLetterLevel = (params: { letterTypeId: string }) => {
  const { data: letterProgress = [] } = useLetterProgress();

  const { data: letterLevels = [] } = useGetLetterLevels({ letterTypeId: params.letterTypeId }, { enabled: !!params.letterTypeId });

  let nextLevel = letterLevels.find((letterLevel) => {
    const isComplete = letterProgress.some((letterProgress) => letterProgress.letter_level_id === letterLevel.id);

    return !isComplete;
  });

  if (!nextLevel) {
    nextLevel = shuffleArray(letterLevels)[0]
  }

  return nextLevel
};
