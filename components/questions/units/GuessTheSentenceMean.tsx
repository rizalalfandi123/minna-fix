import OptionsQuestion from "../OptionsQuestion";
import QuestionSentenceButton from "../QuestionSentenceButton";
import { View } from "react-native";
import { Text } from "~/components/ui/text";
import LetterOptions from "../LetterOptions";
import { UnitQuestionType } from "~/types";
import { useTranslation } from "react-i18next";
import { Language } from "~/contexts/userContext";
import UnitOptionsQuestion from "./UnitOptionsQuestion";

export type GuessTheSentenceMeanProps = {
  question: Extract<UnitQuestionType, { type: "GUESS_THE_SENTENCE_MEAN" }>;
  withHint: boolean;
};

const GuessTheSentenceMean: React.FC<GuessTheSentenceMeanProps> = ({ question, withHint }) => {
  const { i18n } = useTranslation();

  const activeLang = i18n.language as Language;

  return (
    <UnitOptionsQuestion
      type="GUESS_THE_SENTENCE_MEAN"
      data={{
        answer: question.data.answer[activeLang],
        options: question.data.options.map((item) => item[activeLang]),
        question: question.data.question.map((item) => item.value).join(""),
      }}
      renderAnswer={() => {
        return (
          <QuestionSentenceButton
            sentence={question.data.question.map((item) => ({
              word: item.value,
              hintData: [item.mean[activeLang], ...Object.values(item.alternative ?? {})],
            }))}
            withHint={withHint}
          />
        );
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

export default GuessTheSentenceMean;
