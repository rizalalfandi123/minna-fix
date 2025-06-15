import { Database } from "~/database.types";
import { PostgrestError } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";
import supabase from "~/libs/supabase";
import { day } from "~/lib/constants/sizes";

export type LetterLevel = Database["public"]["Tables"]["letter_levels"]["Row"];

export type LetterToLetterLevel = Database["public"]["Tables"]["letters_to_letter_levels"]["Row"];

export const LETTER_LEVELS_KEY = "LETTER_LEVELS";

export const LETTER_TO_LETTER_LEVEL_KEY = "LETTER_TO_LETTER_LEVELS";

export const useGetLetterLevels = () => {
  const query = useQuery<Array<LetterLevel>, PostgrestError>({
    queryKey: [LETTER_LEVELS_KEY],

    queryFn: async () => {
      const response = await supabase.from("letter_levels").select("*");

      if (response.error) {
        throw response.error;
      }

      return response.data;
    },

    staleTime: day,
  });

  return query;
};

export const useGetLetterToLetterLevels = () => {
  const query = useQuery<Array<LetterToLetterLevel>, PostgrestError>({
    queryKey: [LETTER_TO_LETTER_LEVEL_KEY],

    queryFn: async () => {
      const response = await supabase.from("letters_to_letter_levels").select("*");

      if (response.error) {
        throw response.error;
      }

      return response.data;
    },

    staleTime: day,
  });

  return query;
};
