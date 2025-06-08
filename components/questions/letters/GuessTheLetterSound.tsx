import { LetterQuestionType } from "~/services/queries/letterQuestionQueries";
import OptionsQuestion, { OptionsQuestionProps } from "../OptionsQuestion";
import AnswerButton from "../AnswerButton";
import LetterOptions from "../LetterOptions";
import { useTranslation } from "react-i18next";
import LetterSound from "../LetterSound";
import { Text } from "~/components/ui/text";

export type GuessTheLetterSoundProps = {
    question: Extract<LetterQuestionType, { type: "GUESS_THE_LETTER_SOUND" }>;
} & Pick<OptionsQuestionProps, "onCorrectAnswer" | "onErrorAnswer">;

const GuessTheLetterSound: React.FC<GuessTheLetterSoundProps> = ({ question, ...props }) => {
    const { t } = useTranslation();

    return (
        <OptionsQuestion
            {...props}
            data={question.data}
            renderAnswer={({ data }) => {
                return <LetterSound symbol={data.question} />;
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

export default GuessTheLetterSound;
