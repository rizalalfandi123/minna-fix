import React from "react";
import { View } from "react-native";
import SortItemsBySound from "~/components/questions/letters/SortItemsBySound";
import GuessTheLetter from "~/components/questions/letters/GuessTheLetters";
import GuessTheLetterSound from "~/components/questions/letters/GuessTheLetterSound";
import GuessTheSymbol from "~/components/questions/letters/GuessTheSymbol";
import MatchingTextByText from "~/components/questions/letters/MatchingTextByText";
import { contentWidth, learnProgressBarHeight, windowHeight } from "~/lib/constants/sizes";
import { LetterQuestionType } from "~/types";

export type LetterQuestionProps = {
  question: LetterQuestionType;
  onCorrectAnswer?: () => void;
  onErrorAnswer?: () => void;
};

const LetterQuestion: React.FC<LetterQuestionProps> = ({ question, ...props }) => {
  const renderQuestion = React.useMemo(() => {
    switch (question.type) {
      case "GUESS_THE_LETTER":
        return <GuessTheLetter {...props} question={question} />;

      case "GUESS_THE_LETTER_SOUND":
        return <GuessTheLetterSound {...props} {...question.data} />;

      case "GUESS_THE_SYMBOL":
        return <GuessTheSymbol {...props} question={question} />;

      case "MATCHING_TEXT_BY_TEXT":
        return <MatchingTextByText onFinishAnswer={props.onCorrectAnswer} question={question} />;

      case "SORT_THE_ITEMS_BY_SOUND":
        return <SortItemsBySound {...props} question={question} />;

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

export default LetterQuestion;
