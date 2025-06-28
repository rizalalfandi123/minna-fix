import { UnitQuestionType } from "~/types";
import React from "react";
import WriteTheSymbol from "../WriteTheSymbol";
import LetterSound from "../LetterSound";

export type WriteTheSymbolFromSoundProps = {
  question: Extract<UnitQuestionType, { type: "WRITE_THE_SYMBOL_FROM_SOUND" }>;
};

const WriteTheSymbolFromSound: React.FC<WriteTheSymbolFromSoundProps> = (props) => {
  return (
    <WriteTheSymbol
      data={{
        answer: props.question.data.answer,
      }}
      renderQuestion={({ data }) => {
        return <LetterSound symbol={data.answer} />;
      }}
    />
  );
};

export default WriteTheSymbolFromSound;
