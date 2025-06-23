import { PostgrestError } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";
import supabase from "~/libs/supabase";

import { LetterLevelQuestion, UnitLevelQuestion, UnitQuestion } from "~/types";

export type DetailUnitLevelQuestion = UnitLevelQuestion & {
  unit_questions: UnitQuestion;
};

export const UNIT_LEVEL_QUESTIONS_KEY = "UNIT_LEVEL_QUESTIONS";

export const useGetDetailLevelLetterQuestion = (levelId: string) => {
  const query = useQuery<Array<DetailUnitLevelQuestion>, PostgrestError>({
    queryKey: [UNIT_LEVEL_QUESTIONS_KEY, { id: levelId }],

    queryFn: async () => {
      const response = await supabase
        .from("unit_questions_to_unit_levels")
        .select(
          `
            unit_level_id,
            unit_question_id,
            unit_questions (
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
        .overrideTypes<Array<DetailUnitLevelQuestion>>();

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
    queryKey: [UNIT_LEVEL_QUESTIONS_KEY],
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
