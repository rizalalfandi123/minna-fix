import LetterOptions from "../LetterOptions";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { LetterQuestionType } from "~/types";
import LetterOptionsQuestion from "./LetterOptionsQuestion";
import QuestionInstructure from "../QuestionInstruction";

export type GuessTheSymbolProps = {
  question: Extract<LetterQuestionType, { type: "GUESS_THE_SYMBOL" }>;
};

const GuessTheSymbol: React.FC<GuessTheSymbolProps> = ({ question }) => {
  const { t } = useTranslation();

  return (
    <LetterOptionsQuestion
      type="GUESS_THE_SYMBOL"
      data={question.data}
      renderInstruction={() => {
        return (
          <View className="w-full flex-1 items-center justify-center">
            <QuestionInstructure>{t("instruction.guess_the_symbol", { sound: `"${question.data.question}"` })}</QuestionInstructure>
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
