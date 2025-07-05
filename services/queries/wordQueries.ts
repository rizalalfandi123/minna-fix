import { PostgrestError } from "@supabase/supabase-js";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { Language } from "~/contexts/userContext";
import { Database } from "~/database.types";
import supabase from "~/libs/supabase";

export type TWord = Omit<Database["public"]["Tables"]["words"]["Row"], "others"> & {
  others: Record<string, string | Record<Language, string>>;
};

export type GetWordOptions = Partial<UseQueryOptions<TWord, PostgrestError>>;

export const WORDS = "WORDS";

export const useGetWord = (key: string, options?: GetWordOptions) => {
  const query = useQuery<TWord, PostgrestError>({
    queryKey: [WORDS, { key }],

    queryFn: async () => {
      const words = await supabase.from("words").select("*").eq("key", key).single().overrideTypes<TWord>();

      if (words.error) {
        throw words.error;
      }

      return words.data;
    },

    ...(options ?? {}),
  });

  return query;
};
