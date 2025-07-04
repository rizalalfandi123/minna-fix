import { UnitQuestionType } from "~/types";
import QuestionSentenceButton from "../QuestionSentenceButton";
import { View } from "react-native";
import { Text } from "~/components/ui/text";
import LetterOptions from "../LetterOptions";
import UnitOptionsQuestion from "./UnitOptionsQuestion";
import useBuildSentence from "~/hooks/useBuildSentence";

export type GuessTheSymbolFromMeanProps = {
  question: Extract<UnitQuestionType, { type: "GUESS_THE_SYMBOL_FROM_MEAN" }>;
  withHint: boolean;
};

const GuessTheSymbolFromMean: React.FC<GuessTheSymbolFromMeanProps> = ({ question, withHint }) => {
  const sentence = useBuildSentence({ data: question.data.question });

  return (
    <UnitOptionsQuestion
      type="GUESS_THE_SYMBOL_FROM_MEAN"
      data={{
        answer: question.data.answer,
        options: question.data.options,
        question: question.data.question.map((item) => item.value).join(""),
      }}
      renderAnswer={() => {
        return <QuestionSentenceButton withSpeak={false} sentence={sentence} withHint={withHint} />;
      }}
      renderInstruction={() => {
        return (
          <View className="w-full items-center justify-center">
            <Text className="w-full text-center font-sans-medium text-lg">dwwd</Text>
          </View>
        );
      }}
      renderOptions={({ data, ...props }) => {
        return <LetterOptions {...props} options={data.options} />;
      }}
    />
  );
};

export default GuessTheSymbolFromMean;
