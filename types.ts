import { Letter } from "~/services/queries/letterQueries";
import { Database } from "./database.types";

export type Nullable<T> = T | null;

export type Optional<T> = T | undefined;

export type Nullish<T> = T | null | undefined;

export type TLetterChart = Array<Array<Nullable<Letter>>>;

export type Unit = Database["public"]["Tables"]["units"]["Row"];

export type TLetterTypeName = "hiragana" | "katakana" | "kanji";

export type MutationOperation = "create" | "edit" | "delete";

export type TAnswerStatus = Nullable<"success" | "error">;

export type TranslatedWord = Record<"id" | "en", { translate: string; index: number }>;

export type SymbolWord = {
  value: string;
  alternative?: Partial<{
    hiragana: string;
    katakana: string;
    kanji: string;
    romaji: string;
  }>;
  translation?: TranslatedWord;
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

export type UnitQuestionType =
  | {
      type: "GUESS_THE_SENTENCE_MEAN";
      data: {
        options: {
          id: string[];
          en: string[];
        };
        answer: {
          id: string;
          en: string;
        };
        question: {
          value: string;
          key: string;
        }[];
      };
    }
  | {
      type: "SORT_THE_MEAN";
      data: {
        options: {
          id: string[];
          en: string[];
        };
        answer: {
          id: string;
          en: string;
        };
        question: {
          value: string;
          key: string;
        }[];
      };
    }
  | {
      type: "GUESS_THE_SOUND_MEAN";
      data: {
        question: string;
        options: {
          id: string[];
          en: string[];
        };
        answer: {
          id: string;
          en: string;
        };
      };
    }
  | {
      type: "GUESS_THE_SYMBOL_FROM_MEAN";
      data: {
        options: string[];
        answer: string;
        question: {
          id: {
            value: string;
            key: string;
          }[];
          en: {
            value: string;
            key: string;
          }[];
        };
      };
    }
  | {
      type: "SORT_THE_SYMBOLS_FROM_MEAN";
      data: {
        options: string[];
        answer: string;
        question: {
          id: {
            value: string;
            key: string;
          }[];
          en: {
            value: string;
            key: string;
          }[];
        };
      };
    }
  | {
      type: "SORT_THE_SYMBOLS_FROM_SOUND";
      data: {
        question: string;
        answer: string;
        options: Array<string>;
      };
    }
  | {
      type: "WRITE_THE_SYMBOL_FROM_MEAN";
      data: {
        answer: string;
        question: {
          id: {
            value: string;
            key: string;
          }[];
          en: {
            value: string;
            key: string;
          }[];
        };
      };
    }
  | {
      type: "WRITE_THE_SYMBOL_FROM_SOUND";
      data: {
        question: string;
        answer: string;
      };
    };

export type UnitQuestionCategory = "VOCABULARY" | "GRAMMAR" | "EXERCISE";

export type UnitQuestion = Omit<Database["public"]["Tables"]["unit_questions"]["Row"], "question"> & {
  question: UnitQuestionType;
};

export type LetterLevelQuestion = Database["public"]["Tables"]["letter_questions_to_letter_levels"]["Row"];

export type UnitLevelQuestion = Database["public"]["Tables"]["unit_questions_to_unit_levels"]["Row"];
