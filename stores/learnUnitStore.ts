import { create } from "zustand";
import { isOptionsQuestion, isSortQuestion, isWriteQuestion } from "~/helpers/unitQuestionNarrowing";
import { Nullable, TAnswerStatus, UnitQuestion } from "~/types";
import * as wanakana from "wanakana";
import { removeUnusedSymbol } from "~/helpers/formatter";

export type TUnitGuessQuestion = "GUESS_THE_SENTENCE_MEAN" | "GUESS_THE_SYMBOL_FROM_MEAN" | "GUESS_THE_SOUND_MEAN";

export type TUnitSortQuestion = "SORT_THE_MEAN" | "SORT_THE_SYMBOLS_FROM_MEAN" | "SORT_THE_SYMBOLS_FROM_SOUND";

export type TLearnUnitQuestionData =
  | {
      type: TUnitGuessQuestion;
      selectedAnswer: Nullable<string>;
      answer: string;
    }
  | {
      type: TUnitSortQuestion;
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
      statusMessage: string;
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
    statusMessage: "",
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
        activeQuestionData: initalData.activeQuestionData,
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
        activeQuestionData: initalData.activeQuestionData,
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

    let statusMessage: string = "";

    if (isOptionsQuestion(previousData.data.activeQuestionData.data)) {
      const selectedAnswer = previousData.data.activeQuestionData.data.selectedAnswer;

      const isCorrect = selectedAnswer === previousData.data.activeQuestionData.data.answer;

      if (typeof selectedAnswer === "string") {
        answerStatus = isCorrect ? "success" : "error";
      }
    }

    if (isSortQuestion(previousData.data.activeQuestionData.data)) {
      const selectedAnswer = previousData.data.activeQuestionData.data.selectedAnswer;

      const isCorrect = removeUnusedSymbol(previousData.data.activeQuestionData.data.answer) === removeUnusedSymbol(selectedAnswer.join(""));

      answerStatus = isCorrect ? "success" : "error";
    }

    if (isWriteQuestion(previousData.data.activeQuestionData.data)) {
      const inputAnswer = previousData.data.activeQuestionData.data.inputAnswer;

      const isCorrect = removeUnusedSymbol(inputAnswer) === removeUnusedSymbol(previousData.data.activeQuestionData.data.answer);

      if (typeof inputAnswer === "string") {
        answerStatus = isCorrect ? "success" : "error";
      }

      if (answerStatus === "error") {
        statusMessage = wanakana.toRomaji(previousData.data.activeQuestionData.data.answer, { convertLongVowelMark: false, upcaseKatakana: true });
      }
    }

    set({ data: { ...previousData.data, activeQuestionData: { ...previousData.data.activeQuestionData, answerStatus, statusMessage } } });
  },
}));

export default useLearnUnitStore;
