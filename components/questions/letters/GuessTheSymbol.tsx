import { LetterQuestionType } from "~/services/queries/letterQuestionQueries";
import OptionsQuestion, { OptionsQuestionProps } from "../OptionsQuestion";
import AnswerButton from "../AnswerButton";
import LetterOptions from "../LetterOptions";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { Text } from "~/components/ui/text";

export type GuessTheSymbolProps = {
    question: Extract<LetterQuestionType, { type: "GUESS_THE_SYMBOL" }>;
} & Pick<OptionsQuestionProps, "onCorrectAnswer" | "onErrorAnswer">;

const GuessTheSymbol: React.FC<GuessTheSymbolProps> = ({ question, ...props }) => {
    const { t } = useTranslation();

    return (
        <OptionsQuestion
            {...props}
            data={question.data}
            renderButton={(props) => {
                return <AnswerButton {...props} />;
            }}
            renderInstruction={() => {
                return (
                    <View className="w-full flex-1 items-center justify-center">
                        <Text className="w-full text-center font-sans-medium text-lg">
                            {t("instruction.guess_the_symbol", { sound: `"${question.data.question}"` })}
                        </Text>
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
