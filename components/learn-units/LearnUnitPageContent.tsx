import React from "react";
import { FlatList, View } from "react-native";
import useScreenSize from "~/helpers/useScreenSize";
import { UnitQuestion as TUnitQuestion } from "~/types";
import useLearnUnitStore, { TUnitQuestionQueueItem } from "~/stores/learnUnitStore";
import delay from "~/helpers/delay";
import AnswerButton from "../questions/AnswerButton";
import UnitQuestion from "../questions/units/UnitQuestion";
import LearnProgressBar from "../LearnProgressBar";
import LearnUnitSummaryPage from "../summaries/LearnUnitSummaryPage";
import { isSummarySection } from "~/helpers/unitQuestionNarrowing";
import QuestionSkipper from "~/components/__dev__/QuestionSkipper";
import { cn } from "~/lib/utils";

export type LearnUnitPageContentProps = {
  questions: Array<{ question: TUnitQuestion; withHint: boolean }>;
  levelId: string;
  onBack: () => void;
};

const LearnUnitPageContent: React.FC<LearnUnitPageContentProps> = ({ questions, levelId, onBack }) => {
  const initialized = React.useRef<boolean>(false);

  const listRef = React.useRef<FlatList<TUnitQuestionQueueItem> | null>(null);

  const questionQueue = useLearnUnitStore((state) => state.data.questionQueue);

  const activeQuestionIndex = useLearnUnitStore((state) => state.data.activeQuestionIndex);

  const answerStatus = useLearnUnitStore((state) => state.data.activeQuestionData.answerStatus);

  const statusMessage = useLearnUnitStore((state) => state.data.activeQuestionData.statusMessage);

  const handleCheckAnserStatus = useLearnUnitStore((state) => state.handleCheckAnserStatus);

  const setQuestionQueue = useLearnUnitStore((state) => state.setQuestionQueue);

  const resetData = useLearnUnitStore((state) => state.resetData);

  const handleSuccessAnswer = useLearnUnitStore((state) => state.handleSuccessAnswer);

  const handleFailedAnswer = useLearnUnitStore((state) => state.handleFailedAnswer);

  const { learnHight, contentWidth } = useScreenSize();

  const handlePressContinue = () => {
    if (answerStatus === "success") {
      handleSuccessAnswer((nextIndex) => {
        console.log({ nextIndex });
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

  const renderItem = ({ item }: { item: TUnitQuestionQueueItem; index: number }) => {
    if (isSummarySection(item)) {
      return <LearnUnitSummaryPage levelId={levelId} onNext={onBack} />;
    }

    return (
      <View style={{ height: learnHight }} className="justify-center flex-col gap-2 items-center">
        <UnitQuestion question={item.question} withHint={item.withHint} />
      </View>
    );
  };

  React.useEffect(() => {
    if (!initialized.current && questions.length > 0) {
      setQuestionQueue([...questions, "SUMMARY"]);

      initialized.current = true;
    }

    return () => resetData();
  }, [questions]);

  return (
    <View className={cn("flex-1 bg-background", { relative: __DEV__ })}>
      {activeQuestionIndex < questionQueue.length - 1 && <LearnProgressBar handleBack={onBack} health={8} progress={20} />}

      <FlatList<TUnitQuestionQueueItem>
        ref={listRef}
        data={questionQueue}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${index}-${isSummarySection(item) ? item : item.question.id}`}
        horizontal
        pagingEnabled
        scrollEnabled={false}
        initialNumToRender={4}
        maxToRenderPerBatch={5}
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

      {activeQuestionIndex < questionQueue.length - 1 && (
        <AnswerButton onPressCheckAnswer={handleCheckAnserStatus} statusMessage={statusMessage} onPressContinue={handlePressContinue} answerStatus={answerStatus} />
      )}

      <QuestionSkipper levelId={levelId} />
    </View>
  );
};

export default LearnUnitPageContent;
