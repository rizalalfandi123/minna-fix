import { PostgrestError } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";
import { day } from "~/lib/constants/sizes";
import { Database } from "~/database.types";
import supabase from "~/libs/supabase";

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
    letter_questions_to_letter_levels: Array<{
        letter_question_id: string;
        letter_level_id: string;
        number: number;
    }>;
    question: LetterQuestionType;
};

export const LETTER_QUESTIONS = "LETTER_QUESTIONS";

export const useGetLetterQuestions = () => {
    const query = useQuery<Array<LetterQuestion>, PostgrestError>({
        queryKey: [LETTER_QUESTIONS],

        queryFn: async () => {
            const response = await supabase
                .from("letter_questions")
                .select(
                    `   
                    created_at,
                    deleted,
                    id,
                    question,
                    updated_at,
                    letter_questions_to_letter_levels (
                        letter_question_id,
                        letter_level_id,
                        number
                    )`
                )
                .overrideTypes<
                    Array<{
                        question: LetterQuestionType;
                    }>
                >();

            if (response.error) {
                throw response.error;
            }

            return response.data;
        },

        staleTime: day,
    });

    return query;
};
