import { Letter } from "~/services/queries/letterQueries";
import { Database } from "./database.types";

export type Nullable<T> = T | null;

export type Optional<T> = T | undefined;

export type Nullish<T> = T | null | undefined;

export type TLetterChart = Array<Array<Nullable<Letter>>>;

export type Unit = Database["public"]["Tables"]["units"]["Row"];

export type TLetterTypeName = "hiragana" | "katakana" | "kanji";

export type MutationOperation = "create" | "edit" | "delete";

export type AnswerStatus = Nullable<"success" | "error">;

export type TranslatedWord = Record<"id" | "en", string>;

export type SymbolWord = {
  value: string;
  alternative?: Partial<{
    hiragana: string;
    katakana: string;
    kanji: string;
    romaji: string;
  }>;
  mean: TranslatedWord;
};

export type LetterQuestionType =
  | {
      type: "GUESS_THE_LETTER";
      data: {
        options: string[];
        answer: string;
        question: string;
      };
    }
  | {
      type: "GUESS_THE_SYMBOL";
      data: {
        options: string[];
        answer: string;
        question: string;
      };
    }
  | {
      type: "GUESS_THE_LETTER_SOUND";
      data: {
        options: string[];
        answer: string;
        question: string;
      };
    }
  | {
      type: "MATCHING_TEXT_BY_TEXT";
      data: {
        answer: {
          rightSide: string;
          leftSide: string;
        }[];
        options: {
          rightSide: string;
          leftSide: string;
        }[];
      };
    }
  | {
      type: "SORT_THE_ITEMS_BY_SOUND";
      data: {
        answer: string;
        options: {
          number: number;
          value: string;
        }[];
      };
    };

export type LetterQuestion = Omit<Database["public"]["Tables"]["letter_questions"]["Row"], "question"> & {
  question: LetterQuestionType;
};
