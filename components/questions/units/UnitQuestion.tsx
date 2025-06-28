import React from "react";
import { View } from "react-native";
import GuessTheLetterSound from "~/components/questions/letters/GuessTheLetterSound";
import { contentWidth, learnProgressBarHeight } from "~/lib/constants/sizes";
import GuessTheSentenceMean from "./GuessTheSentenceMean";
import GuessTheSymbolFromMean from "./GuessTheSymbolFromMean";
import SortTheMeans from "./SortTheMeans";
import SortTheSymbolFromMean from "./SortTheSymbolFromMean";
import WriteTheSymbolFromMean from "./WriteTheSymbolFromMean";
import WriteTheSymbolFromSound from "./WriteTheSymbolFromSound";
import useScreenHeight from "~/helpers/useScreenHeight";
import { UnitQuestion as TUnitQuestion } from "~/types";
import { useTranslation } from "react-i18next";
import { Language } from "~/contexts/userContext";

export type UnitQuestionProps = {
  question: TUnitQuestion;
  withHint?: boolean;
};

const UnitQuestion: React.FC<UnitQuestionProps> = ({ question, withHint = true }) => {
  const { screenHeight } = useScreenHeight();

  const { i18n } = useTranslation();

  const activeLang = i18n.language as Language;

  const renderQuestion = React.useMemo(() => {
    const questionData = question.question.data;

    switch (questionData.type) {
      case "GUESS_THE_SENTENCE_MEAN":
        return <GuessTheSentenceMean withHint={withHint} question={questionData} />;

      case "GUESS_THE_SOUND_MEAN": {
        const guessTheSoundData = {
          options: questionData.data.options.map((word) => word[activeLang]),
          answer: questionData.data.answer[activeLang],
          question: questionData.data.question,
        };

        return <GuessTheLetterSound {...guessTheSoundData} />;
      }

      case "GUESS_THE_SYMBOL_FROM_MEAN":
        return <GuessTheSymbolFromMean withHint={withHint} question={questionData} />;

      case "SORT_THE_MEAN":
        return <SortTheMeans withHint={withHint} question={questionData} />;

      case "SORT_THE_SYMBOLS_FROM_MEAN":
        return <SortTheSymbolFromMean  withHint={withHint} question={questionData} />;

      case "WRITE_THE_SYMBOL_FROM_MEAN":
        return <WriteTheSymbolFromMean  withHint={withHint} question={questionData} />;

      case "WRITE_THE_SYMBOL_FROM_SOUND":
        return <WriteTheSymbolFromSound question={questionData} />;

      default:
        return null;
    }
  }, [question]);

  return <View className="flex-col gap-3 flex-1">{renderQuestion}</View>;
};

export default UnitQuestion;
