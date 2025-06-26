import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import CenteredSpinner from "~/components/CenteredSpinner";
import LearnUnitPageContent from "~/components/learn-units/LearnUnitPageContent";
import { useGetDetailUnitLevelQuestion } from "~/services/queries/unitLevelQuestionQueries";
import { UnitQuestion } from "~/types";

const LearnVocabularyPage = () => {
  const params = useLocalSearchParams<{ id: string }>();

  const { data = [], isLoading } = useGetDetailUnitLevelQuestion(params.id);

  console.log({ data })

  const questions: Array<{ question: UnitQuestion; withHint: boolean }> = data.map((item) => ({ question: item.unit_questions, withHint: item.with_hint }));

  return (
    <View className="w-full h-full">
      {isLoading && questions.length > 0 ? <CenteredSpinner /> : <LearnUnitPageContent levelId={params.id} questions={questions} />}
    </View>
  );
};

export default LearnVocabularyPage;
