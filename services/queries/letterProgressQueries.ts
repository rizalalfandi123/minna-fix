import { Database } from "~/database.types";
import { isLetterProgressLocalOrErrorSynced } from "~/helpers/narrowing";
import queryClient from "~/libs/query-client";
import { MutationOperation } from "~/types";
import { PostgrestError } from "@supabase/supabase-js";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { v4 as uuid } from "uuid";
import supabase from "~/libs/supabase";

export type LetterProgress = Database["public"]["Tables"]["letter_progress"]["Row"] & {
    letter_levels: {
        letter_type_id: string;
    };
};

export const LETTER_PROGRESS = "LETTER_PROGRESS";

export type LetterProgressData =
    | {
          progress: LetterProgress;
          status: "synced";
          id: string;
      }
    | {
          progress: LetterProgress;
          status: "local";
          operation: MutationOperation;
          number: number;
          id: string;
      }
    | {
          progress: LetterProgress;
          status: "error-synced";
          id: string;
      };

export const getLetterProgressQueryOptions = queryOptions<Array<LetterProgressData>, PostgrestError>({
    queryKey: [LETTER_PROGRESS],

    queryFn: async () => {
        const response = await supabase.from("letter_progress").select(`
                created_at,
                deleted,
                id,
                is_completed,
                letter_level_id,
                updated_at,
                letter_levels (
                    letter_type_id
                )
            `);

        const localData: Array<LetterProgressData> = (queryClient.getQueryData(getLetterProgressQueryOptions.queryKey) ?? []).filter((item) =>
            isLetterProgressLocalOrErrorSynced(item)
        );

        const syncedData: Array<LetterProgressData> = (response.data ?? []).map((item) => ({
            progress: item,
            status: "synced",
            id: uuid(),
        }));

        const allData = [...localData, ...syncedData];

        return allData;
    },

    staleTime: Infinity,

    gcTime: Infinity,

    refetchOnMount: true,

    refetchOnWindowFocus: false,
});

export const useGetLetterProgress = () => {
    const query = useQuery<Array<LetterProgressData>, PostgrestError>(getLetterProgressQueryOptions);

    return query;
};
