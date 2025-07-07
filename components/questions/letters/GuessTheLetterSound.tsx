import LetterOptions from "../LetterOptions";
import { useTranslation } from "react-i18next";
import LetterSound from "../LetterSound";
import LetterOptionsQuestion from "./LetterOptionsQuestion";
import QuestionInstructure from "../QuestionInstruction";

export type GuessTheLetterSoundProps = {
  options: string[];
  answer: string;
  question: string;
};

const GuessTheLetterSound: React.FC<GuessTheLetterSoundProps> = ({ question, answer, options }) => {
  const { t } = useTranslation();

  return (
    <LetterOptionsQuestion
      type="GUESS_THE_LETTER_SOUND"
      data={{ answer, options }}
      renderAnswer={() => {
        return <LetterSound symbol={question} />;
      }}
      renderInstruction={() => {
        return <QuestionInstructure>{t("instruction.guess_the_letter")}</QuestionInstructure>;
      }}
      renderOptions={({ data, ...props }) => {
        return <LetterOptions options={data.options} {...props} />;
      }}
    />
  );
};

export default GuessTheLetterSound;
