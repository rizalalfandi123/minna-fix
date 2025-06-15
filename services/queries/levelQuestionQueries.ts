import { PostgrestError } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";
import { Database } from "~/database.types";
import supabase from "~/libs/supabase";

import { LetterQuestion } from "~/types";

export type LevelQuestion = Database["public"]["Tables"]["letter_questions_to_letter_levels"]["Row"];

export type DetailLevelQuestion = LevelQuestion & {
  letter_questions: LetterQuestion;
};

export const LEVEL_QUESTIONS_KEY = "LEVEL_QUESTIONS";

export const useGetDetailLevelQuestion = (levelId: string) => {
  const query = useQuery<Array<DetailLevelQuestion>, PostgrestError>({
    queryKey: [LEVEL_QUESTIONS_KEY, { id: levelId }],

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
        .overrideTypes<Array<DetailLevelQuestion>>();

      if (response.error) {
        throw response.error;
      }

      return response.data;
    },
  });

  return query;
};

export const useGetLevelQuestion = () => {
  const query = useQuery<Array<LevelQuestion>, PostgrestError>({
    queryKey: [LEVEL_QUESTIONS_KEY],
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
