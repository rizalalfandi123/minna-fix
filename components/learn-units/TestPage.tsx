import React from "react";
import { FlatList, View } from "react-native";
import useScreenHeight from "~/helpers/useScreenHeight";
import { UnitQuestion as TUnitQuestion } from "~/types";
import useLearnUnitStore from "~/stores/learnUnitStore";
import delay from "~/helpers/delay";
import AnswerButton from "../questions/AnswerButton";
import UnitQuestion from "../questions/units/UnitQuestion";

const TestPage: React.FC<{ questions: Array<TUnitQuestion> }> = ({ questions }) => {
  const initialized = React.useRef<boolean>(false);

  const listRef = React.useRef<FlatList<TUnitQuestion> | null>(null);

  const questionQueue = useLearnUnitStore((state) => state.data.questionQueue);

  console.log({ questionQueue });
  const answerStatus = useLearnUnitStore((state) => state.data.activeQuestionData.answerStatus);

  const handleCheckAnserStatus = useLearnUnitStore((state) => state.handleCheckAnserStatus);

  const setQuestionQueue = useLearnUnitStore((state) => state.setQuestionQueue);

  const handleSuccessAnswer = useLearnUnitStore((state) => state.handleSuccessAnswer);

  const handleFailedAnswer = useLearnUnitStore((state) => state.handleFailedAnswer);

  const { screenHeight, contentWidth } = useScreenHeight();

  React.useEffect(() => {
    if (!initialized.current && questions.length > 0) {
      setQuestionQueue(questions);

      initialized.current = true;
    }
  }, [questions]);

  const handlePressContinue = () => {
    if (answerStatus === "success") {
      handleSuccessAnswer((nextIndex) => {
        if (listRef.current) {
          listRef.current.scrollToIndex({ index: nextIndex });
        }
      });
    }

    if (answerStatus === "error") {
      handleFailedAnswer((nextIndex) => {
        if (listRef.current) {
          listRef.current.scrollToIndex({ index: nextIndex, animated: true });
        }
      });
    }
  };

  const renderItem = ({ item }: { item: TUnitQuestion; index: number }) => {
   

    return (
      <View style={{ width: contentWidth, height: screenHeight - 80 - 96 }} className="justify-center flex-col gap-2 items-center">
        <UnitQuestion question={item} />
      </View>
    );
  };

  return (
    <View className="flex-1 bg-background">
      <View className="h-20" />
      <FlatList<TUnitQuestion>
        ref={listRef}
        data={questionQueue}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${index}-${item.id}`}
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
            listRef.current?.scrollToIndex({
              index: info.index,
              animated: true,
            });
          });
        }}
      />
      <AnswerButton onPressCheckAnswer={handleCheckAnserStatus} onPressContinue={handlePressContinue} answerStatus={answerStatus} />
    </View>
  );
};

export default TestPage;
