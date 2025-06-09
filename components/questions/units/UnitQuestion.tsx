import React from "react";
import { Dimensions, View } from "react-native";
import GuessTheLetterSound from "~/components/questions/letters/GuessTheLetterSound";
import { contentWidth, learnProgressBarHeight, windowHeight } from "~/lib/constants/sizes";
import { UnitQuestionType } from "~/services/queries/unitQuestionQueries";
import GuessTheSentenceMean from "./GuessTheSentenceMean";
import GuessTheSymbolFromMean from "./GuessTheSymbolFromMean";
import SortTheMeans from "./SortTheMeans";
import SortTheSymbolFromMean from "./SortTheSymbolFromMean";
import WriteTheSymbolFromMean from "./WriteTheSymbolFromMean";
import WriteTheSymbolFromSound from "./WriteTheSymbolFromSound";

export type UnitQuestionProps = {
  question: UnitQuestionType;
  onCorrectAnswer?: () => void;
  onErrorAnswer?: () => void;
};

const UnitQuestion: React.FC<UnitQuestionProps> = ({ question, ...props }) => {
  const renderQuestion = React.useMemo(() => {
    switch (question.type) {
      case "GUESS_THE_SENTENCE_MEAN":
        return <GuessTheSentenceMean {...props} question={question} />;

      case "GUESS_THE_SOUND_MEAN":
        return <GuessTheLetterSound {...props} {...question.data} />;

      case "GUESS_THE_SYMBOL_FROM_MEAN":
        return <GuessTheSymbolFromMean {...props} question={question} />;

      case "SORT_THE_MEANS":
        return <SortTheMeans {...props} question={question} />;

      case "SORT_THE_SYMBOLS_FROM_MEAN":
        return <SortTheSymbolFromMean {...props} question={question} />;

      case "WRITE_THE_SYMBOL_FROM_MEAN":
        return <WriteTheSymbolFromMean {...props} question={question} />;

      case "WRITE_THE_SYMBOL_FROM_SOUND":
        return <WriteTheSymbolFromSound {...props} question={question} />;

      default:
        return null;
    }
  }, [question, props]);

  return (
    <View style={{ width: contentWidth, height: windowHeight - learnProgressBarHeight }} className="flex-1 flex-col gap-3">
      {renderQuestion}
    </View>
  );
};

export default UnitQuestion;
