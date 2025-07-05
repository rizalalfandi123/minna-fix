import useUnitProgressMutation from "~/services/mutations/useUnitProgressMutation";
import { Button } from "../ui/button";
import { Text } from "../ui/text";
import { UNIT_PROGRESS_KEY } from "~/services/queries/unitProgressQueries";
import { useQueryClient } from "@tanstack/react-query";
import { v4 as uuid } from "uuid";
import useBackHandler from "~/hooks/useBackHandler";

const QuestionSkipper: React.FC<{ levelId: string }> = ({ levelId }) => {
  const handleBack = useBackHandler("/units");

  const queryClient = useQueryClient();

  const { mutate: createUnitProgress } = useUnitProgressMutation({
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [UNIT_PROGRESS_KEY] });

      handleBack()
    },
  });

  const handleIncreaseLevel = () => {
    createUnitProgress({ id: uuid(), created_at: new Date().toISOString(), deleted: false, unit_level_id: levelId, updated_at: new Date().toISOString() });
  };

  if (!__DEV__) {
    return null;
  }

  return (
    <Button onPress={handleIncreaseLevel} variant="outline" className="absolute top-10 left-2">
      <Text>Skip</Text>
    </Button>
  );
};

export default QuestionSkipper;
