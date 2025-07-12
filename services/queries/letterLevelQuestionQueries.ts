import { PostgrestError } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";
import supabase from "~/instances/supabase";

import { LetterQuestion, LetterLevelQuestion } from "~/types";

export type DetailLetterLevelQuestion = LetterLevelQuestion & {
  letter_questions: LetterQuestion;
};

export const LETTER_LEVEL_QUESTIONS_KEY = "LETTER_LEVEL_QUESTIONS";

export const useGetDetailLevelLetterQuestion = (levelId: string) => {
  const query = useQuery<Array<DetailLetterLevelQuestion>, PostgrestError>({
    queryKey: [LETTER_LEVEL_QUESTIONS_KEY, { id: levelId }],

    queryFn: async () => {
      const response = await supabase
        .from("letter_questions_to_letter_levels")
        .select(
          `
            letter_level_id,
            letter_question_id,
            number,
            letter_questions (
                created_at,
                deleted,
                id,
                updated_at,
                question
            )
          `
        )
        .eq("letter_level_id", levelId)
        .order("number", { ascending: true })
        .overrideTypes<Array<DetailLetterLevelQuestion>>();

      if (response.error) {
        throw response.error;
      }

      return response.data;
    },
  });

  return query;
};

export const useGetLevelLetterQuestion = () => {
  const query = useQuery<Array<LetterLevelQuestion>, PostgrestError>({
    queryKey: [LETTER_LEVEL_QUESTIONS_KEY],
    queryFn: async () => {
      const response = await supabase.from("letter_questions_to_letter_levels").select("*");

      if (response.error) {
        throw response.error;
      }

      return response.data;
    },
  });

  return query;
};
