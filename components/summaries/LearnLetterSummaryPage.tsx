import { View } from "react-native";
import { contentWidth, learnProgressBarHeight, windowHeight } from "~/lib/constants/sizes";
import { Text } from "../ui/text";
import { Button } from "../ui/button";
import useLetterProgressMutation from "~/services/mutations/useLetterProgressMutation";
import { v4 as uuid } from "uuid";
import { useQueryClient } from "@tanstack/react-query";
import { LETTER_PROGRESS_KEY } from "~/services/queries/letterProgressQueries";

const LearnLetterSummaryPage: React.FC<{ onNext: () => void; levelId: string }> = ({ onNext, levelId }) => {
  const queryClient = useQueryClient();

  const { mutate } = useLetterProgressMutation({
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [LETTER_PROGRESS_KEY] });

      onNext();
    },
  });

  const handleIncreaseLevel = () => {
    mutate({ id: uuid(), created_at: new Date().toISOString(), deleted: false, letter_level_id: levelId, updated_at: new Date().toISOString() });
  };

  return (
    <View style={{ width: contentWidth, height: windowHeight - learnProgressBarHeight }}>
      <View className="w-full flex-col flex-1">
        <View className="flex-1">
          <Text>DOne</Text>
        </View>
        <Button onPress={handleIncreaseLevel}>
          <Text>Next</Text>
        </Button>
      </View>
    </View>
  );
};

export default LearnLetterSummaryPage;
