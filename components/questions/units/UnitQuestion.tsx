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

export type UnitQuestionProps = {
  question: TUnitQuestion;
  onCorrectAnswer?: () => void;
  onErrorAnswer?: () => void;
};

const UnitQuestion: React.FC<UnitQuestionProps> = ({ question, ...props }) => {
  const { screenHeight } = useScreenHeight();

  const renderQuestion = React.useMemo(() => {
    const questionData = question.question.data;

    const activeLanguage = "en";

    switch (questionData.type) {
      case "GUESS_THE_SENTENCE_MEAN":
        return <GuessTheSentenceMean {...props} question={questionData} />;

      case "GUESS_THE_SOUND_MEAN": {
        const guessTheSoundData = {
          options: questionData.data.options.map((word) => word[activeLanguage]),
          answer: questionData.data.answer[activeLanguage],
          question: questionData.data.question,
        };
        
        return <GuessTheLetterSound {...props} {...guessTheSoundData} />;
      }

      case "GUESS_THE_SYMBOL_FROM_MEAN":
        return <GuessTheSymbolFromMean {...props} question={questionData} />;

      case "SORT_THE_MEANS":
        return <SortTheMeans {...props} question={questionData} />;

      case "SORT_THE_SYMBOLS_FROM_MEAN":
        return <SortTheSymbolFromMean {...props} question={questionData} />;

      case "WRITE_THE_SYMBOL_FROM_MEAN":
        return <WriteTheSymbolFromMean {...props} question={questionData} />;

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
