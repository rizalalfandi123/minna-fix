import { View } from "react-native";
import { learnProgressBarHeight } from "~/lib/constants/sizes";
import { Text } from "../ui/text";
import { Button } from "../ui/button";
import { v4 as uuid } from "uuid";
import { useQueryClient } from "@tanstack/react-query";
import useScreenSize from "~/helpers/useScreenSize";
import useUnitProgressMutation from "~/services/mutations/useUnitProgressMutation";
import { UNIT_PROGRESS_KEY } from "~/services/queries/unitProgressQueries";
import useLearnUnitStore from "~/stores/learnUnitStore";

const LearnUnitSummaryPage: React.FC<{ onNext: () => void; levelId: string }> = ({ onNext, levelId }) => {
  const queryClient = useQueryClient();

  const { screenHeight, contentWidth } = useScreenSize();

  const resetData = useLearnUnitStore((state) => state.resetData);

  const { mutate: createUnitProgress } = useUnitProgressMutation({
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [UNIT_PROGRESS_KEY] });

      resetData();

      onNext();
    },
  });

  const handleIncreaseLevel = () => {
    createUnitProgress({ id: uuid(), created_at: new Date().toISOString(), deleted: false, unit_level_id: levelId, updated_at: new Date().toISOString() });
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

export default LearnUnitSummaryPage;
