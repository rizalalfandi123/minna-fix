import React from "react";
import { useGetLetterToLetterLevels } from "~/services/queries/letterLevelQueries";
import useLetterProgress from "~/services/queries/letterProgressQueries";

export const useButtonLetterProgress = ({ letterId }: { letterId?: string }) => {
  const { data: letterToLetterLevels = [] } = useGetLetterToLetterLevels();

  const { data: letterProgress = [] } = useLetterProgress();

  const progress = React.useMemo(() => {
    const allLevelToLetterLevel = letterToLetterLevels.filter((level) => level.letter_id === letterId);

    const progressData = letterProgress.filter((progress) =>
      allLevelToLetterLevel.some((levelToLetter) => progress.letter_level_id === levelToLetter.letter_level_id)
    );

    return (progressData.length / allLevelToLetterLevel.length) * 100;
  }, [letterToLetterLevels, letterId, letterProgress]);

  return { progress };
};
