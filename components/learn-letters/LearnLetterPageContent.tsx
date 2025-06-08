import React from "react";
import { View, FlatList } from "react-native";
import { LetterQuestionType } from "~/services/queries/letterQuestionQueries";
import useBackHandler from "~/hooks/useBackHandler";
import LetterQuestion from "~/components/questions/letters/LetterQuestion";
import LearnProgressBar from "../LearnProgressBar";
import { contentWidth, letterHeight } from "~/lib/constants/sizes";
import delay from "~/helpers/delay";
import { isWeb } from "~/helpers/platform";

type QuestionQueue = { question: LetterQuestionType; isPassed: boolean };

const questions: Array<LetterQuestionType> = [
  {
    type: "GUESS_THE_LETTER",
    data: {
      answer: "ka",
      options: ["ka", "ba", "ca"],
      question: "か",
    },
  },
  {
    type: "SORT_THE_ITEMS_BY_SOUND",
    data: {
      answer: "あおい",
      options: [
        { number: 0, value: "お" },
        { number: 1, value: "あ" },
        { number: 2, value: "い" },
        { number: 3, value: "え" },
      ],
    },
  },
  {
    type: "GUESS_THE_SYMBOL",
    data: {
      answer: "か",
      options: ["か", "ki", "ku", "d"],
      question: "ka",
    },
  },
  {
    type: "GUESS_THE_LETTER_SOUND",
    data: {
      question: "あ",
      options: ["あ", "い", "う", "え", "お"],
      answer: "あ",
    },
  },
  {
    type: "MATCHING_TEXT_BY_TEXT",
    data: {
      options: [
        { rightSide: "あ", leftSide: "i" },
        { rightSide: "お", leftSide: "a" },
        { rightSide: "う", leftSide: "e" },
        { rightSide: "え", leftSide: "u" },
        { rightSide: "い", leftSide: "o" },
      ],
      answer: [
        { rightSide: "あ", leftSide: "a" },
        { rightSide: "お", leftSide: "o" },
        { rightSide: "う", leftSide: "u" },
        { rightSide: "え", leftSide: "e" },
        { rightSide: "い", leftSide: "i" },
      ],
    },
  },
];

const LearnLetterPageContent: React.FC = () => {
  const handleBack = useBackHandler("/letters");

  const [questionQueue, setQuestionQueue] = React.useState<
    Array<QuestionQueue>
  >(() => questions.map((question) => ({ isPassed: false, question })));

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
  }, [currentIndex]);

  const renderItem = React.useCallback(
    ({ item, index }: { item: QuestionQueue; index: number }) => (
      <LetterQuestion
        question={item.question}
        key={index}
        onCorrectAnswer={() => {
          setQuestionQueue((prev) =>
            prev.map((item, i) => {
              if (index === i) {
                return { ...item, isPassed: true };
              }

              return item;
            })
          );

          handleNext();
        }}
        onErrorAnswer={() => {
          setQuestionQueue((prev) => [...prev, item]);

          handleNext();
        }}
      />
    ),
    [currentIndex, handleNext]
  );

  return (
    <View className="flex-1 bg-background">
      <LearnProgressBar handleBack={handleBack} health={8} progress={20} />

      <FlatList<QuestionQueue>
        ref={flatListRef}
        data={questionQueue}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.question.type}-${index}`}
        horizontal
        pagingEnabled
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        initialNumToRender={2}
        maxToRenderPerBatch={2}
        windowSize={2}
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
