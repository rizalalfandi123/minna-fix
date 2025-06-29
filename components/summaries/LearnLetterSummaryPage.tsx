import { View } from "react-native";
import { contentWidth, learnProgressBarHeight } from "~/lib/constants/sizes";
import { Text } from "../ui/text";
import { Button } from "../ui/button";
import useLetterProgressMutation from "~/services/mutations/useLetterProgressMutation";
import { v4 as uuid } from "uuid";
import { useQueryClient } from "@tanstack/react-query";
import { LETTER_PROGRESS_KEY } from "~/services/queries/letterProgressQueries";
import useScreenHeight from "~/helpers/useScreenHeight";
import useLearnLetterStore from "~/stores/learnLetterStore";

const LearnLetterSummaryPage: React.FC<{ onNext: () => void; levelId: string }> = ({ onNext, levelId }) => {
  const queryClient = useQueryClient();

  const { screenHeight } = useScreenHeight();

  const resetData = useLearnLetterStore((state) => state.resetData);

  const { mutate: createLetterProgress } = useLetterProgressMutation({
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [LETTER_PROGRESS_KEY] });

      resetData();

      onNext();
    },
  });

  const handleIncreaseLevel = () => {
    createLetterProgress({ id: uuid(), created_at: new Date().toISOString(), deleted: false, letter_level_id: levelId, updated_at: new Date().toISOString() });
  };

  return (
    <View style={{ width: contentWidth, height: screenHeight - learnProgressBarHeight }}>
      <View className="w-full flex-col flex-1">
        <View className="flex-1">
          <Text>Done</Text>
        </View>
        <View className="h-24 items-center justify-center w-full">
          <Button className="w-full" onPress={handleIncreaseLevel}>
            <Text>Next</Text>
          </Button>
        </View>
      </View>
    </View>
  );
};

export default LearnLetterSummaryPage;
