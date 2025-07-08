import LetterOptions from "../LetterOptions";
import { useTranslation } from "react-i18next";
import LetterSound from "../LetterSound";
import UnitOptionsQuestion from "./UnitOptionsQuestion";
import QuestionInstructure from "../QuestionInstruction";

export type GuessTheSoundMeanProps = {
  options: string[];
  answer: string;
  question: string;
};

const GuessTheSoundMean: React.FC<GuessTheSoundMeanProps> = ({ question, answer, options }) => {
  const { t } = useTranslation();

  return (
    <UnitOptionsQuestion
      type="GUESS_THE_SOUND_MEAN"
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

export default GuessTheSoundMean;
