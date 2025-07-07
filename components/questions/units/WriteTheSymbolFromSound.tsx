import { UnitQuestionType } from "~/types";
import React from "react";
import WriteTheSymbol from "../WriteTheSymbol";
import LetterSound from "../LetterSound";
import { useTranslation } from "react-i18next";

export type WriteTheSymbolFromSoundProps = {
  question: Extract<UnitQuestionType, { type: "WRITE_THE_SYMBOL_FROM_SOUND" }>;
};

const WriteTheSymbolFromSound: React.FC<WriteTheSymbolFromSoundProps> = (props) => {
  const { t } = useTranslation();

  return (
    <WriteTheSymbol
      data={{
        answer: props.question.data.answer,
      }}
      instruction={t("instruction.write_the_symbol_from_sound")}
      renderQuestion={({ data }) => {
        return <LetterSound symbol={data.answer} />;
      }}
    />
  );
};

export default WriteTheSymbolFromSound;
