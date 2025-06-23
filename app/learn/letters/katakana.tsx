import { useLocalSearchParams } from "expo-router";
import React from "react";
import { View } from "react-native";
import CenteredSpinner from "~/components/CenteredSpinner";
import LearnLetterPageContent from "~/components/learn-letters/LearnLetterPageContent";
import { useGetDetailLevelLetterQuestion } from "~/services/queries/letterLevelQuestionQueries";

function KatakanaLearnLetterPage() {
  const { levelId } = useLocalSearchParams<{ levelId: string }>();

  const { data: levelQuestions = [], isLoading } = useGetDetailLevelLetterQuestion(levelId);

  return (
    <View className="w-full h-full">{isLoading ? <CenteredSpinner /> : <LearnLetterPageContent levelId={levelId} levelQuestions={levelQuestions} />}</View>
  );
}

export default KatakanaLearnLetterPage;
