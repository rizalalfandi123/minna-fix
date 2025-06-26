import React from "react";
import { View, FlatList } from "react-native";
import useBackHandler from "~/hooks/useBackHandler";
import LearnProgressBar from "../LearnProgressBar";
import { contentWidth } from "~/lib/constants/sizes";
import delay from "~/helpers/delay";
import { isWeb } from "~/helpers/platform";
import UnitQuestion from "../questions/units/UnitQuestion";
import { UnitQuestion as TUnitQuestion } from "~/types";
import LearnUnitSummaryPage from "../summaries/LearnUnitSummaryPage";

type QuestionQueue = { question: TUnitQuestion; isPassed: boolean; withHint: boolean } | "DONE";

function isQuestionQuene(queue: QuestionQueue): queue is Extract<QuestionQueue, { isPassed: boolean }> {
  return typeof queue !== "string";
}

const LearnUnitPageContent: React.FC<{ questions: Array<{ question: TUnitQuestion; withHint: boolean }>; levelId: string }> = ({ questions, levelId }) => {
  const initialized = React.useRef<boolean>(false);

  const handleBack = useBackHandler("/units");

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
        return <LearnUnitSummaryPage levelId={levelId} onNext={handleBack} />;
      }

      return (
        <UnitQuestion
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
          withHint={item.withHint}
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
    [currentIndex, handleNext]
  );

  React.useEffect(() => {
    if (!initialized.current && questions.length > 0) {
      const initialQuestionQueue = questions.map((item) => ({ isPassed: false, question: item.question, withHint: item.withHint }));

      console.log({ initialQuestionQueue, questions });

      setQuestionQueue([...initialQuestionQueue, "DONE"]);

      initialized.current = true;
    }
  }, [questions]);

  return (
    <View className="flex-1 bg-background">
      <LearnProgressBar handleBack={handleBack} health={8} progress={20} />

      <FlatList<QuestionQueue>
        ref={flatListRef}
        data={questionQueue}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${isQuestionQuene(item) ? item.question.id : item}-${index}`}
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

export default LearnUnitPageContent;
