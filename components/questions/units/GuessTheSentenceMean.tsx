import { UnitQuestionType } from "~/services/queries/unitQuestionQueries";
import OptionsQuestion, { OptionsQuestionProps } from "../OptionsQuestion";
import QuestionSentenceButton from "../QuestionSentenceButton";
import { View } from "react-native";
import { Text } from "~/components/ui/text";

export type GuessTheSentenceMeanProps = {
    question: Extract<UnitQuestionType, { type: "GUESS_THE_SENTENCE_MEAN" }>;
} & Pick<OptionsQuestionProps, "onCorrectAnswer" | "onErrorAnswer">;

const GuessTheSentenceMean: React.FC<GuessTheSentenceMeanProps> = ({ question, ...props }) => {
    const activeLang = "en";
    return (
        <OptionsQuestion
            {...props}
            data={{
                answer: question.data.answer[activeLang],
                options: question.data.options.map((item) => item[activeLang]),
                question: question.data.question.map((item) => item.value).join(""),
            }}
            renderButton={(props) => {
                return (
                    <QuestionSentenceButton
                        sentence={question.data.question.map((item) => ({
                            word: item.value,
                            hintData: [item.value, ...Object.values(item.alternative ?? {}), item.mean.en],
                        }))}
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
                return null;
            }}
        />
    );
};

export default GuessTheSentenceMean;
