import { create } from "zustand";
import { SorterItemData } from "~/components/questions/ItemSorter";
import { isOptionsQuestion, isSortQuestion, isWriteQuestion } from "~/helpers/unitQuestionNarrowing";
import { Nullable, TAnswerStatus, UnitQuestion } from "~/types";

export type TLearnUnitQuestionData =
  | {
      type: "GUESS_THE_SENTENCE_MEAN" | "GUESS_THE_SYMBOL_FROM_MEAN" | "GUESS_THE_SOUND_MEAN";
      selectedAnswer: Nullable<string>;
      answer: string;
    }
  | {
      type: "SORT_THE_MEAN" | "SORT_THE_SYMBOLS_FROM_MEAN" | "SORT_THE_SYMBOLS_FROM_SOUND";
      selectedAnswer: Array<string>;
      answer: string;
    }
  | {
      type: "WRITE_THE_SYMBOL_FROM_SOUND";
      inputAnswer: string;
      answer: string;
    };

export type TUnitQuestionQueueItem = { question: UnitQuestion; withHint: boolean } | "SUMMARY";

export type TLearnUnitStoreData = {
  data: {
    questionQueue: Array<TUnitQuestionQueueItem>;
    activeQuestionIndex: number;
    activeQuestionData: {
      answerStatus: TAnswerStatus;
      isLocked: boolean;
      data: Nullable<TLearnUnitQuestionData>;
    };
  };
};

export type TLearnUnitStoreMutations = {
  setQuestionQueue: (data: Array<TUnitQuestionQueueItem>) => void;

  setAnswerStatus: (status: TAnswerStatus) => void;

  setIsLocked: (status: boolean) => void;

  setActiveQuestionData: (data: Nullable<TLearnUnitQuestionData>) => void;

  resetData: () => void;

  handleSuccessAnswer: (cb?: (nextActiveQuestionIndex: number) => void) => void;

  handleFailedAnswer: (cb?: (nextActiveQuestionIndex: number) => void) => void;

  handleCheckAnserStatus: () => void;
};

export type TLearnUnitStore = TLearnUnitStoreData & TLearnUnitStoreMutations;

const initalData: TLearnUnitStoreData["data"] = {
  questionQueue: [],
  activeQuestionIndex: 0,
  activeQuestionData: {
    answerStatus: null,
    isLocked: false,
    data: null,
  },
};

const useLearnUnitStore = create<TLearnUnitStore>((set, get) => ({
  data: initalData,

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

  resetData: () =>
    set({
      data: initalData,
    }),

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

    if (isSortQuestion(previousData.data.activeQuestionData.data)) {
      const selectedAnswer = previousData.data.activeQuestionData.data.selectedAnswer;

      const isCorrect =
        previousData.data.activeQuestionData.data.answer.replace(/\s+/g, "") ===
        selectedAnswer
          .join("")
          .replace(/\s+/g, "");

      answerStatus = isCorrect ? "success" : "error";
    }

    if (isWriteQuestion(previousData.data.activeQuestionData.data)) {
      const inputAnswer = previousData.data.activeQuestionData.data.inputAnswer;

      console.log({
        quest: previousData.data.activeQuestionData.data.answer.replace(/\s+/g, ""),
        answer: inputAnswer.replace(/\s+/g, "")
      })

      const isCorrect = inputAnswer.replace(/\s+/g, "") === previousData.data.activeQuestionData.data.answer.replace(/\s+/g, "");

      if (typeof inputAnswer === "string") {
        answerStatus = isCorrect ? "success" : "error";
      }
    }

    set({ data: { ...previousData.data, activeQuestionData: { ...previousData.data.activeQuestionData, answerStatus } } });
  },
}));

export default useLearnUnitStore;
