import OptionsQuestion from "../OptionsQuestion";
import LetterOptions from "../LetterOptions";
import { useTranslation } from "react-i18next";
import LetterSound from "../LetterSound";
import { Text } from "~/components/ui/text";
import LetterOptionsQuestion from "./LetterOptionsQuestion";

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
        return <Text className="w-full text-left font-sans-medium text-lg">{t("instruction.guess_the_letter")}</Text>;
      }}
      renderOptions={({ data, ...props }) => {
        return <LetterOptions options={data.options} {...props} />;
      }}
    />
  );
};

export default GuessTheLetterSound;
