import { create } from "zustand";
import { isOptionsQuestion } from "~/helpers/letterQuestionNarrowing";
import { Nullable, TAnswerStatus, LetterQuestion } from "~/types";

export type TLearnLetterQuestionData = {
  type: "GUESS_THE_LETTER" | "GUESS_THE_SYMBOL" | "GUESS_THE_LETTER_SOUND";
  selectedAnswer: Nullable<string>;
  answer: string;
};
// | {
//     type: "SORT_THE_MEAN";
//     selectedAnswer: Array<SorterItemData>;
//     answer: string;
//   }
// | {
//     type: "WRITE_THE_SYMBOL_FROM_SOUND";
//     inputAnswer: string;
//     answer: string;
//   };

export type TLetterQuestionQueueItem = LetterQuestion | "SUMMARY";

export type TLearnLetterStoreData = {
  data: {
    questionQueue: Array<TLetterQuestionQueueItem>;
    activeQuestionIndex: number;
    activeQuestionData: {
      answerStatus: TAnswerStatus;
      isLocked: boolean;
      data: Nullable<TLearnLetterQuestionData>;
    };
  };
};

export type TLearnLetterStoreMutations = {
  setQuestionQueue: (data: Array<TLetterQuestionQueueItem>) => void;

  setAnswerStatus: (status: TAnswerStatus) => void;

  setIsLocked: (status: boolean) => void;

  setActiveQuestionData: (data: Nullable<TLearnLetterQuestionData>) => void;

  handleSuccessAnswer: (cb?: (nextActiveQuestionIndex: number) => void) => void;

  handleFailedAnswer: (cb?: (nextActiveQuestionIndex: number) => void) => void;

  handleCheckAnserStatus: () => void;
};

export type TLearnLetterStore = TLearnLetterStoreData & TLearnLetterStoreMutations;

const useLearnLetterStore = create<TLearnLetterStore>((set, get) => ({
  data: {
    questionQueue: [],
    activeQuestionIndex: 0,
    activeQuestionData: {
      answerStatus: null,
      isLocked: false,
      data: null,
    },
  },

  setQuestionQueue: (queue) => set((prev) => ({ data: { ...prev.data, questionQueue: queue } })),

  handleSuccessAnswer: (cb) => {
    const previousData = get();

    const nextActiveQuestionIndex = previousData.data.activeQuestionIndex + 1;

    set({
      data: {
        ...previousData.data,
        activeQuestionIndex: nextActiveQuestionIndex,
        activeQuestionData: {
          answerStatus: null,
          isLocked: false,
          data: null,
        },
      },
    });

    cb?.(nextActiveQuestionIndex);
  },

  handleFailedAnswer: (cb) => {
    const previousData = get();

    const nextActiveQuestionIndex = previousData.data.activeQuestionIndex + 1;

    const nextQuestionQueue = [...previousData.data.questionQueue];

    nextQuestionQueue.splice(nextQuestionQueue.length - 1, 0, previousData.data.questionQueue[previousData.data.activeQuestionIndex]);

    set({
      data: {
        activeQuestionIndex: nextActiveQuestionIndex,
        questionQueue: nextQuestionQueue,
        activeQuestionData: {
          answerStatus: null,
          isLocked: false,
          data: null,
        },
      },
    });

    cb?.(nextActiveQuestionIndex);
  },

  setAnswerStatus: (nextStatus) => {
    const previousData = get();

    set({ data: { ...previousData.data, activeQuestionData: { ...previousData.data.activeQuestionData, answerStatus: nextStatus } } });
  },

  setIsLocked: (nextLocked) => {
    const previousData = get();

    set({ data: { ...previousData.data, activeQuestionData: { ...previousData.data.activeQuestionData, isLocked: nextLocked } } });
  },

  setActiveQuestionData: (data) => {
    const previousData = get();

    set({ data: { ...previousData.data, activeQuestionData: { ...previousData.data.activeQuestionData, data } } });
  },

  handleCheckAnserStatus: () => {
    const previousData = get();

    let answerStatus: TAnswerStatus = null;

    if (isOptionsQuestion(previousData.data.activeQuestionData.data)) {
      const selectedAnswer = previousData.data.activeQuestionData.data.selectedAnswer;

      const isCorrect = selectedAnswer === previousData.data.activeQuestionData.data.answer;

      if (typeof selectedAnswer === "string") {
        answerStatus = isCorrect ? "success" : "error";
      }
    }

    // if (isSortQuestion(previousData.data.activeQuestionData.data)) {
    //   const selectedAnswer = previousData.data.activeQuestionData.data.selectedAnswer;

    //   const isCorrect = previousData.data.activeQuestionData.data.answer === selectedAnswer.map((item) => item.value).join("");

    //   if (typeof selectedAnswer === "string") {
    //     answerStatus = isCorrect ? "success" : "error";
    //   }
    // }

    // if (isWriteQuestion(previousData.data.activeQuestionData.data)) {
    //   const inputAnswer = previousData.data.activeQuestionData.data.inputAnswer;

    //   const isCorrect = inputAnswer.trim() === previousData.data.activeQuestionData.data.answer;

    //   if (typeof inputAnswer === "string") {
    //     answerStatus = isCorrect ? "success" : "error";
    //   }
    // }

    // console.log({ answerStatus });

    set({ data: { ...previousData.data, activeQuestionData: { ...previousData.data.activeQuestionData, answerStatus } } });
  },
}));

export default useLearnLetterStore;
