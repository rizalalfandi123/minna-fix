import React from "react";
import { View, FlatList } from "react-native";
import useBackHandler from "~/hooks/useBackHandler";
import LearnProgressBar from "../LearnProgressBar";
import { contentWidth } from "~/lib/constants/sizes";
import delay from "~/helpers/delay";
import { isWeb } from "~/helpers/platform";
import UnitQuestion from "../questions/units/UnitQuestion";
import { UnitQuestion as TUnitQuestion } from "~/services/queries/unitQuestionQueries";

type QuestionQueue = { question: TUnitQuestion; isPassed: boolean };

const questions: Array<TUnitQuestion> = [
  {
    created_at: "",
    deleted: false,
    id: "kmd",
    updated_at: "",
    question: {
      type: "WRITE_THE_SYMBOL_FROM_MEAN",
      data: {
        answer: "わたし",
        question: [
          {
            value: "わたし",
            mean: {
              en: "I",
              id: "Saya",
            },
            alternative: {
              romaji: "watashi",
            },
          },
        ],
      },
    },
  },

  {
    created_at: "",
    deleted: false,
    id: "kmd",
    updated_at: "",
    question: {
      type: "GUESS_THE_SOUND_MEAN",
      data: {
        answer: "I",
        options: ["I", "You"],
        question: "わたし",
      },
    },
  },
  {
    created_at: "",
    deleted: false,
    id: "kmd",
    updated_at: "",
    question: {
      type: "GUESS_THE_SENTENCE_MEAN",
      data: {
        answer: {
          en: "I",
          id: "Saya",
        },
        options: [
          {
            en: "I",
            id: "Saya",
          },
          {
            en: "de",
            id: "de",
          },
          {
            en: "Ifw",
            id: "Sfwaya",
          },
        ],
        question: [
          {
            value: "わたし",
            mean: {
              en: "I",
              id: "Saya",
            },
            alternative: {
              romaji: "watashi",
            },
          },
        ],
      },
    },
  },

  {
    created_at: "",
    deleted: false,
    id: "kmd",
    updated_at: "",
    question: {
      type: "SORT_THE_MEANS",
      data: {
        answer: {
          en: "I",
          id: "Saya",
        },
        options: [
          {
            en: "I",
            id: "Saya",
          },
          {
            en: "de",
            id: "de",
          },
          {
            en: "Ifw",
            id: "Sfwaya",
          },
        ].map((value, number) => ({ number, value })),
        question: [
          {
            value: "わたし",
            mean: {
              en: "I",
              id: "Saya",
            },
            alternative: {
              romaji: "watashi",
            },
          },
        ],
      },
    },
  },

  {
    created_at: "",
    deleted: false,
    id: "kmd",
    updated_at: "",
    question: {
      type: "GUESS_THE_SYMBOL_FROM_MEAN",
      data: {
        answer: "わたし",
        options: ["わたし", "わし"],
        question: [
          {
            value: "わたし",
            mean: {
              en: "I",
              id: "Saya",
            },
            alternative: {
              romaji: "watashi",
            },
          },
        ],
      },
    },
  },

  {
    created_at: "",
    deleted: false,
    id: "kmd",
    updated_at: "",
    question: {
      type: "SORT_THE_SYMBOLS_FROM_MEAN",
      data: {
        answer: "わたし",
        options: ["わたし", "わし"].map((value, number) => ({ number, value })),
        question: [
          {
            value: "わたし",
            mean: {
              en: "I",
              id: "Saya",
            },
            alternative: {
              romaji: "watashi",
            },
          },
        ],
      },
    },
  },

  {
    created_at: "",
    deleted: false,
    id: "kmd",
    updated_at: "",
    question: {
      type: "WRITE_THE_SYMBOL_FROM_SOUND",
      data: {
        answer: "わたし",
        question: "わたし",
      },
    },
  },
];

const LearnUnitPageContent: React.FC = () => {
  const handleBack = useBackHandler("/units");

  const [questionQueue, setQuestionQueue] = React.useState<Array<QuestionQueue>>(() => questions.map((question) => ({ isPassed: false, question })));

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
      <UnitQuestion
        question={item.question.question}
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
        keyExtractor={(item, index) => `${item.question.id}-${index}`}
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
