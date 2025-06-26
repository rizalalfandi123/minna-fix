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
  onCorrectAnswer?: () => void;
  onErrorAnswer?: () => void;
};

const UnitQuestion: React.FC<UnitQuestionProps> = ({ question, withHint = true, ...props }) => {
  const { screenHeight } = useScreenHeight();

  const { i18n } = useTranslation();

  const activeLang = i18n.language as Language;

  const renderQuestion = React.useMemo(() => {
    const questionData = question.question.data;

    switch (questionData.type) {
      case "GUESS_THE_SENTENCE_MEAN":
        return <GuessTheSentenceMean {...props} withHint={withHint} question={questionData} />;

      case "GUESS_THE_SOUND_MEAN": {
        const guessTheSoundData = {
          options: questionData.data.options.map((word) => word[activeLang]),
          answer: questionData.data.answer[activeLang],
          question: questionData.data.question,
        };

        return <GuessTheLetterSound {...props} {...guessTheSoundData} />;
      }

      case "GUESS_THE_SYMBOL_FROM_MEAN":
        return <GuessTheSymbolFromMean {...props} withHint={withHint} question={questionData} />;

      case "SORT_THE_MEAN":
        return <SortTheMeans {...props} withHint={withHint} question={questionData} />;

      case "SORT_THE_SYMBOLS_FROM_MEAN":
        return <SortTheSymbolFromMean {...props} withHint={withHint} question={questionData} />;

      case "WRITE_THE_SYMBOL_FROM_MEAN":
        return <WriteTheSymbolFromMean {...props} withHint={withHint} question={questionData} />;

      case "WRITE_THE_SYMBOL_FROM_SOUND":
        return <WriteTheSymbolFromSound {...props} question={questionData} />;

      default:
        return null;
    }
  }, [question, props]);

  return (
    <View style={{ width: contentWidth, height: screenHeight - learnProgressBarHeight }} className="flex-1 flex-col gap-3">
      {renderQuestion}
    </View>
  );
};

export default UnitQuestion;
