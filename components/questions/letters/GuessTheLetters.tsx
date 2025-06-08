import { LetterQuestionType } from "~/services/queries/letterQuestionQueries";
import OptionsQuestion, { OptionsQuestionProps } from "../OptionsQuestion";
import LetterSymbol from "../LetterSymbol";
import AnswerButton from "../AnswerButton";
import LetterOptions from "../LetterOptions";
import { useTranslation } from "react-i18next";
import { Text } from "~/components/ui/text";

export type GuessTheLetterProps = {
    question: Extract<LetterQuestionType, { type: "GUESS_THE_LETTER" }>;
} & Pick<OptionsQuestionProps, "onCorrectAnswer" | "onErrorAnswer">;

const GuessTheLetter: React.FC<GuessTheLetterProps> = ({ question, ...props }) => {
    const { t } = useTranslation();

    return (
        <OptionsQuestion
            {...props}
            data={question.data}
            renderAnswer={({ data }) => {
                return <LetterSymbol symbol={data.question} />;
            }}
            renderButton={(props) => {
                return <AnswerButton {...props} />;
            }}
            renderInstruction={() => {
                return <Text className="w-full text-left font-sans-medium text-lg">{t("instruction.guess_the_letter")}</Text>;
            }}
            renderOptions={({ data, ...props }) => {
                return <LetterOptions options={data.options} {...props} />;
            }}
        />
    );
};

export default GuessTheLetter;
