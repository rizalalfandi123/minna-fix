import OptionsQuestion, { OptionsQuestionProps } from "../OptionsQuestion";
import LetterSymbol from "../LetterSymbol";
import LetterOptions from "../LetterOptions";
import { useTranslation } from "react-i18next";
import { Text } from "~/components/ui/text";
import { LetterQuestionType } from "~/types";
import LetterOptionsQuestion from "./LetterOptionsQuestion";

export type GuessTheLetterProps = {
  question: Extract<LetterQuestionType, { type: "GUESS_THE_LETTER" }>;
};

const GuessTheLetter: React.FC<GuessTheLetterProps> = ({ question }) => {
  const { t } = useTranslation();

  return (
    <LetterOptionsQuestion
      type="GUESS_THE_LETTER"
      data={question.data}
      renderAnswer={() => {
        return <LetterSymbol symbol={question.data.question} />;
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
