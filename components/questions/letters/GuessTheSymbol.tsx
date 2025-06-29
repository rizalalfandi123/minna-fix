import OptionsQuestion from "../OptionsQuestion";
import LetterOptions from "../LetterOptions";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { Text } from "~/components/ui/text";
import { LetterQuestionType } from "~/types";
import LetterOptionsQuestion from "./LetterOptionsQuestion";

export type GuessTheSymbolProps = {
  question: Extract<LetterQuestionType, { type: "GUESS_THE_SYMBOL" }>;
};

const GuessTheSymbol: React.FC<GuessTheSymbolProps> = ({ question }) => {
  const { t } = useTranslation();

  return (
    <LetterOptionsQuestion
      data={question.data}
      renderInstruction={() => {
        return (
          <View className="w-full flex-1 items-center justify-center">
            <Text className="w-full text-center font-sans-medium text-lg">{t("instruction.guess_the_symbol", { sound: `"${question.data.question}"` })}</Text>
          </View>
        );
      }}
      renderOptions={({ data, ...props }) => {
        return <LetterOptions options={data.options} {...props} />;
      }}
    />
  );
};

export default GuessTheSymbol;
