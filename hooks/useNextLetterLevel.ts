import { useGetLetterLevels } from "~/services/queries/letterLevelQueries";
import useLetterProgress from "~/services/queries/letterProgressQueries";

export const useNextLetterLevel = () => {
  const { data: letterProgress = [] } = useLetterProgress();

  const { data: letterLevels = [] } = useGetLetterLevels();

  const nextLevel = letterLevels.find((letterLevel) => {
    const isComplete = letterProgress.some((letterProgress) => letterProgress.letter_level_id === letterLevel.id);

    return !isComplete;
  });


  return nextLevel
};
