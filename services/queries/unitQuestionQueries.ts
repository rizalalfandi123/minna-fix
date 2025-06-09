import { Database } from "~/database.types";
import { SymbolWord, TranslatedWord } from "~/types";

export type UnitQuestionType =
  | {
      type: "GUESS_THE_SENTENCE_MEAN";
      data: {
        options: Array<TranslatedWord>;
        answer: TranslatedWord;
        question: Array<SymbolWord>;
      };
    }
  | {
      type: "SORT_THE_MEANS";
      data: {
        question: Array<SymbolWord>;
        answer: TranslatedWord;
        options: {
          number: number;
          value: TranslatedWord;
        }[];
      };
    }
  | {
      type: "GUESS_THE_SOUND_MEAN";
      data: {
        options: Array<string>;
        answer: string;
        question: string;
      };
    }
  | {
      type: "GUESS_THE_SYMBOL_FROM_MEAN";
      data: {
        options: Array<string>;
        answer: string;
        question: Array<SymbolWord>;
      };
    }
  | {
      type: "SORT_THE_SYMBOLS_FROM_MEAN";
      data: {
        question: Array<SymbolWord>;
        answer: string;
        options: {
          number: number;
          value: string;
        }[];
      };
    }
  | {
      type: "WRITE_THE_SYMBOL_FROM_MEAN";
      data: {
        question: Array<SymbolWord>;
        answer: string;
      };
    }
  | {
      type: "WRITE_THE_SYMBOL_FROM_SOUND";
      data: {
        question: string;
        answer: string;
      };
    };

export type UnitQuestion = Omit<Database["public"]["Tables"]["unit_questions"]["Row"], "question"> & {
  question: UnitQuestionType;
};
