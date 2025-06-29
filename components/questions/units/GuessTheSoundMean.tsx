import LetterOptions from "../LetterOptions";
import { useTranslation } from "react-i18next";
import LetterSound from "../LetterSound";
import { Text } from "~/components/ui/text";
import UnitOptionsQuestion from "./UnitOptionsQuestion";

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
      data={{ answer, options, question }}
      renderAnswer={({ data }) => {
        return <LetterSound symbol={data.question} />;
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

export default GuessTheSoundMean;
