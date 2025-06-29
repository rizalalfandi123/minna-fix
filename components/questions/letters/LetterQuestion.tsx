import React from "react";
import { View } from "react-native";
import GuessTheLetterSound from "~/components/questions/letters/GuessTheLetterSound";
import useScreenSize from "~/helpers/useScreenSize";
import { LetterQuestion as TLetterQuestion } from "~/types";
import GuessTheLetter from "./GuessTheLetters";
import GuessTheSymbol from "./GuessTheSymbol";
import MatchingTextByText from "./MatchingTextByText";
import SortItemsBySound from "./SortItemsBySound";

export type LetterQuestionProps = {
  question: TLetterQuestion;
  withHint?: boolean;
};

const LetterQuestion: React.FC<LetterQuestionProps> = ({ question, withHint = true }) => {
  const { contentWidth } = useScreenSize();

  const renderQuestion = React.useMemo(() => {
    const questionData = question.question;

    switch (questionData.type) {
      case "GUESS_THE_LETTER":
        return <GuessTheLetter question={questionData} />;

      case "GUESS_THE_LETTER_SOUND": {
        const guessTheSoundData = {
          options: questionData.data.options,
          answer: questionData.data.answer,
          question: questionData.data.question,
        };

        return <GuessTheLetterSound {...guessTheSoundData} />;
      }

      case "GUESS_THE_SYMBOL":
        return <GuessTheSymbol question={questionData} />;

      case "MATCHING_TEXT_BY_TEXT":
        return <MatchingTextByText question={questionData} />;

      case "SORT_THE_ITEMS_BY_SOUND":
        return <SortItemsBySound question={questionData} />;

      default:
        return null;
    }
  }, [question]);

  return (
    <View style={{ width: contentWidth }} className="flex-col gap-3 flex-1 px-4">
      {renderQuestion}
    </View>
  );
};

export default LetterQuestion;
