import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import CenteredSpinner from "~/components/CenteredSpinner";
import TestPage from "~/components/learn-units/TestPage";
import { useGetDetailUnitLevelQuestion } from "~/services/queries/unitLevelQuestionQueries";
import { UnitQuestion } from "~/types";

const LearnVocabularyPage = () => {
  const params = useLocalSearchParams<{ id: string }>();

  const { data = [], isLoading } = useGetDetailUnitLevelQuestion(params.id);

  const questions: Array<UnitQuestion> = data.map((item) => item.unit_questions);

  return <View className="w-full h-full">{isLoading && questions.length > 0 ? <CenteredSpinner /> : <TestPage questions={questions} />}</View>;
};

export default LearnVocabularyPage;
