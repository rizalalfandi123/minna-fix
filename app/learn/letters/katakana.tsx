import { useLocalSearchParams } from "expo-router";
import React from "react";
import { View } from "react-native";
import CenteredSpinner from "~/components/CenteredSpinner";
import LearnLetterPageContent from "~/components/learn-letters/LearnLetterPageContent";
import useBackHandler from "~/hooks/useBackHandler";
import { useGetDetailLevelLetterQuestion } from "~/services/queries/letterLevelQuestionQueries";

function KatakanaLearnLetterPage() {
  const handleBack = useBackHandler("/letters");

  const { levelId } = useLocalSearchParams<{ levelId: string }>();

  const { data: levelQuestions = [], isLoading } = useGetDetailLevelLetterQuestion(levelId);

  return (
    <View className="w-full h-full">
      {isLoading ? <CenteredSpinner /> : <LearnLetterPageContent levelId={levelId} questions={levelQuestions} onBack={handleBack} />}
    </View>
  );
}

export default KatakanaLearnLetterPage;
