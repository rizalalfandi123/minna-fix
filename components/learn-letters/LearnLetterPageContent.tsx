import React from "react";
import { FlatList, View } from "react-native";
import useScreenSize from "~/helpers/useScreenSize";
import delay from "~/helpers/delay";
import AnswerButton from "../questions/AnswerButton";
import LearnProgressBar from "../LearnProgressBar";
import { isSummarySection } from "~/helpers/letterQuestionNarrowing";
import LearnLetterSummaryPage from "../summaries/LearnLetterSummaryPage";
import useLearnLetterStore, { type TLetterQuestionQueueItem } from "~/stores/learnLetterStore";
import LetterQuestion from "../questions/letters/LetterQuestion";
import { DetailLetterLevelQuestion } from "~/services/queries/letterLevelQuestionQueries";

export type LearnLetterPageContentProps = {
  questions: Array<DetailLetterLevelQuestion>;
  levelId: string;
  onBack: () => void;
};

const LearnLetterPageContent: React.FC<LearnLetterPageContentProps> = ({ questions, levelId, onBack }) => {
  const initialized = React.useRef<boolean>(false);

  const listRef = React.useRef<FlatList<TLetterQuestionQueueItem> | null>(null);

  const questionQueue = useLearnLetterStore((state) => state.data.questionQueue);

  console.log({ questionQueue: questionQueue });

  const activeQuestionIndex = useLearnLetterStore((state) => state.data.activeQuestionIndex);

  const answerStatus = useLearnLetterStore((state) => state.data.activeQuestionData.answerStatus);

  const handleCheckAnserStatus = useLearnLetterStore((state) => state.handleCheckAnserStatus);

  const setQuestionQueue = useLearnLetterStore((state) => state.setQuestionQueue);

  const handleSuccessAnswer = useLearnLetterStore((state) => state.handleSuccessAnswer);

  const handleFailedAnswer = useLearnLetterStore((state) => state.handleFailedAnswer);

  const { learnHight, contentWidth } = useScreenSize();

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

  const renderItem = ({ item }: { item: TLetterQuestionQueueItem; index: number }) => {
    if (isSummarySection(item)) {
      return <LearnLetterSummaryPage levelId={levelId} onNext={onBack} />;
    }

    return (
      <View style={{ height: learnHight }} className="justify-center flex-col gap-2 items-center">
        <LetterQuestion question={item} />
      </View>
    );
  };

  React.useEffect(() => {
    if (!initialized.current && questions.length > 0) {
      const initialQuestionQueue = questions.map((item) => item.letter_questions);

      setQuestionQueue([...initialQuestionQueue, "SUMMARY"]);

      initialized.current = true;
    }
  }, [questions]);

  return (
    <View className="flex-1 bg-background">
      {activeQuestionIndex < questionQueue.length - 1 && <LearnProgressBar handleBack={onBack} health={8} progress={20} />}

      <FlatList<TLetterQuestionQueueItem>
        ref={listRef}
        data={questionQueue}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${index}-${isSummarySection(item) ? item : item.question.type}`}
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

      {activeQuestionIndex < questionQueue.length - 1 && (
        <AnswerButton onPressCheckAnswer={handleCheckAnserStatus} onPressContinue={handlePressContinue} answerStatus={answerStatus} />
      )}
    </View>
  );
};

export default LearnLetterPageContent;
