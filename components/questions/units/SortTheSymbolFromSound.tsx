import React from "react";
import { UnitQuestionType } from "~/types";
import UnitSortItems from "./UnitSortItems";
import LetterSound from "../LetterSound";
import { useTranslation } from "react-i18next";

export type SortTheSymbolFromSoundProps = {
  question: Extract<UnitQuestionType, { type: "SORT_THE_SYMBOLS_FROM_SOUND" }>;
  withHint: boolean;
};

const SortTheSymbolFromSound: React.FunctionComponent<SortTheSymbolFromSoundProps> = (props) => {
  const { t } = useTranslation();

  const data = React.useMemo(() => ({ answer: props.question.data.answer, options: props.question.data.options.map((item) => item) }), [props.question]);

  return (
    <UnitSortItems
      type="SORT_THE_SYMBOLS_FROM_SOUND"
      instruction={t("instruction.sort_items_by_sound")}
      answer={data.answer}
      options={data.options}
      renderQuestion={() => {
        return <LetterSound symbol={props.question.data.answer} />;
      }}
    />
  );
};

export default SortTheSymbolFromSound;
