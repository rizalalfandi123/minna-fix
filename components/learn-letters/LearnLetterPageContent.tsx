import React from "react";
import { View, FlatList } from "react-native";
import useBackHandler from "~/hooks/useBackHandler";
import LetterQuestion from "~/components/questions/letters/LetterQuestion";
import LearnProgressBar from "../LearnProgressBar";
import { contentWidth, learnProgressBarHeight, windowHeight } from "~/lib/constants/sizes";
import delay from "~/helpers/delay";
import { isWeb } from "~/helpers/platform";
import { DetailLevelQuestion } from "~/services/queries/levelQuestionQueries";
import { LetterQuestionType } from "~/types";
import LearnLetterSummaryPage from "../summaries/LearnLetterSummaryPage";

type QuestionQueue = { question: LetterQuestionType; isPassed: boolean } | "DONE";

export type LearnLetterPageContentProps = {
  levelQuestions: Array<DetailLevelQuestion>;
  levelId: string;
};

function isQuestionQuene(queue: QuestionQueue): queue is Extract<QuestionQueue, { isPassed: boolean }> {
  return typeof queue !== "string";
}

const LearnLetterPageContent: React.FC<LearnLetterPageContentProps> = ({ levelQuestions, levelId }) => {
  const initedQuestion = React.useRef<boolean>(false);

  const handleBack = useBackHandler("/letters");

  const [questionQueue, setQuestionQueue] = React.useState<Array<QuestionQueue>>([]);

  const flatListRef = React.useRef<FlatList<QuestionQueue>>(null);

  const [currentIndex, setCurrentIndex] = React.useState<number>(0);

  const handleNext = React.useCallback(() => {
    if (currentIndex < questionQueue.length - 1) {
      const newIndex = currentIndex + 1;

      setCurrentIndex(newIndex);

      const scrollToNext = () =>
        flatListRef.current?.scrollToIndex({
          index: newIndex,
          animated: true,
        });

      if (isWeb) {
        delay(100).then(() => {
          scrollToNext();
        });
      } else {
        scrollToNext();
      }
    }
  }, [currentIndex, questionQueue]);

  const renderItem = React.useCallback(
    ({ item, index }: { item: QuestionQueue; index: number }) => {
      if (item === "DONE") {
        return <LearnLetterSummaryPage levelId={levelId} onNext={handleBack} />;
      }

      return (
        <LetterQuestion
          question={item.question}
          key={index}
          onCorrectAnswer={() => {
            const nextQuestionQueue = questionQueue.map((item, i) => {
              if (index === i && isQuestionQuene(item)) {
                return { ...item, isPassed: true };
              }

              return item;
            });

            setQuestionQueue(nextQuestionQueue);

            handleNext();
          }}
          onErrorAnswer={() => {
            setQuestionQueue((prev) => {
              const newValue = [...prev];

              newValue.splice(questionQueue.length - 1, 0, item);

              return newValue;
            });

            handleNext();
          }}
        />
      );
    },
    [currentIndex, handleNext, questionQueue, levelId]
  );

  React.useEffect(() => {
    if (!initedQuestion.current && levelQuestions.length > 0) {
      const initialQuestionQueue = levelQuestions.map((level) => ({ isPassed: false, question: level.letter_questions.question }));

      setQuestionQueue([...initialQuestionQueue, "DONE"]);

      initedQuestion.current = true;
    }
  }, [levelQuestions]);

  return (
    <View className="flex-1 bg-background">
      <LearnProgressBar handleBack={handleBack} health={8} progress={20} />

      <FlatList<QuestionQueue>
        ref={flatListRef}
        data={questionQueue}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${isQuestionQuene(item) ? item.question.type : item}-${index}`}
        horizontal
        pagingEnabled
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        removeClippedSubviews
        getItemLayout={(_data, index) => ({
          length: contentWidth,
          offset: contentWidth * index,
          index,
        })}
        onScrollToIndexFailed={(info) => {
          const wait = delay(500);

          wait.then(() => {
            flatListRef.current?.scrollToIndex({
              index: info.index,
              animated: true,
            });
          });
        }}
      />
    </View>
  );
};

export default LearnLetterPageContent;
