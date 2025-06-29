import { TLearnUnitQuestionData, TUnitQuestionQueueItem } from "~/stores/learnUnitStore";
import { Nullable } from "~/types";

export function isOptionsQuestion(questionData: Nullable<TLearnUnitQuestionData>): questionData is Extract<
  TLearnUnitQuestionData,
  {
    type: "GUESS_THE_SENTENCE_MEAN" | "GUESS_THE_SYMBOL_FROM_MEAN" | "GUESS_THE_SOUND_MEAN";
  }
> {
  if (!questionData) {
    return false;
  }

  return ["GUESS_THE_SENTENCE_MEAN", "GUESS_THE_SYMBOL_FROM_MEAN", "GUESS_THE_SOUND_MEAN"].includes(questionData.type);
}

export function isSortQuestion(questionData: Nullable<TLearnUnitQuestionData>): questionData is Extract<
  TLearnUnitQuestionData,
  {
    type: "SORT_THE_MEAN";
  }
> {
  if (!questionData) {
    return false;
  }

  return ["SORT_THE_MEAN"].includes(questionData.type);
}

export function isWriteQuestion(questionData: Nullable<TLearnUnitQuestionData>): questionData is Extract<
  TLearnUnitQuestionData,
  {
    type: "WRITE_THE_SYMBOL_FROM_SOUND";
  }
> {
  if (!questionData) {
    return false;
  }

  return ["WRITE_THE_SYMBOL_FROM_SOUND"].includes(questionData.type);
}

export function isSummarySection(item: TUnitQuestionQueueItem): item is "SUMMARY" {
  return typeof item === "string";
}
