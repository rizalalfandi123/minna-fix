import { LetterQuestionType } from "~/services/queries/letterQuestionQueries";
import OptionsQuestion, { OptionsQuestionProps } from "../OptionsQuestion";
import AnswerButton from "../AnswerButton";
import LetterOptions from "../LetterOptions";
import { useTranslation } from "react-i18next";
import LetterSound from "../LetterSound";
import { Text } from "~/components/ui/text";

export type GuessTheLetterSoundProps = {
  options: string[];
  answer: string;
  question: string;
} & Pick<OptionsQuestionProps, "onCorrectAnswer" | "onErrorAnswer">;

const GuessTheLetterSound: React.FC<GuessTheLetterSoundProps> = ({ question, answer, options, ...props }) => {
  const { t } = useTranslation();

  return (
    <OptionsQuestion
      {...props}
      data={{ answer, options, question }}
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
