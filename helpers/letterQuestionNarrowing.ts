import { TLearnLetterQuestionData, TLetterQuestionQueueItem } from "~/stores/learnLetterStore";
import { Nullable } from "~/types";

export function isOptionsQuestion(questionData: Nullable<TLearnLetterQuestionData>): questionData is Extract<
  TLearnLetterQuestionData,
  {
    type: "GUESS_THE_LETTER" | "GUESS_THE_SYMBOL" | "GUESS_THE_LETTER_SOUND";
  }
> {
  if (!questionData) {
    return false;
  }

  return ["GUESS_THE_LETTER", "GUESS_THE_SYMBOL", "GUESS_THE_LETTER_SOUND"].includes(questionData.type);
}

export function isSortQuestion(questionData: Nullable<TLearnLetterQuestionData>): questionData is Extract<
  TLearnLetterQuestionData,
  {
    type: "SORT_THE_ITEMS_BY_SOUND";
  }
> {
  if (!questionData) {
    return false;
  }

  return ["SORT_THE_ITEMS_BY_SOUND"].includes(questionData.type);
}

// export function isWriteQuestion(questionData: Nullable<TLearnUnitQuestionData>): questionData is Extract<
//   TLearnUnitQuestionData,
//   {
//     type: "WRITE_THE_SYMBOL_FROM_SOUND";
//   }
// > {
//   if (!questionData) {
//     return false;
//   }

//   return ["WRITE_THE_SYMBOL_FROM_SOUND"].includes(questionData.type);
// }

export function isSummarySection(item: TLetterQuestionQueueItem): item is "SUMMARY" {
  return typeof item === "string";
}
