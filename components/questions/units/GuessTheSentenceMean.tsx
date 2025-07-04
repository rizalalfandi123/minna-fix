import QuestionSentenceButton from "../QuestionSentenceButton";
import { View } from "react-native";
import { Text } from "~/components/ui/text";
import LetterOptions from "../LetterOptions";
import { UnitQuestionType } from "~/types";
import { useTranslation } from "react-i18next";
import { Language } from "~/contexts/userContext";
import UnitOptionsQuestion from "./UnitOptionsQuestion";
import useBuildSentence from "~/hooks/useBuildSentence";

export type GuessTheSentenceMeanProps = {
  question: Extract<UnitQuestionType, { type: "GUESS_THE_SENTENCE_MEAN" }>;
  withHint: boolean;
};

const GuessTheSentenceMean: React.FC<GuessTheSentenceMeanProps> = ({ question, withHint }) => {
  const { i18n } = useTranslation();

  const activeLang = i18n.language as Language;

  const sentence = useBuildSentence({ data: question.data.question, isUseTranslation: false });

  return (
    <UnitOptionsQuestion
      type="GUESS_THE_SENTENCE_MEAN"
      data={{
        answer: question.data.answer[activeLang].translate,
        options: question.data.options.map((item) => item[activeLang].translate),
        question: question.data.question.map((item) => item.value).join(""),
      }}
      renderAnswer={() => {
        return <QuestionSentenceButton sentence={sentence} withHint={withHint} />;
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
