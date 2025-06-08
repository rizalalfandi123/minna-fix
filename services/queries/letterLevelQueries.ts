import { Database } from "~/database.types";
import { PostgrestError } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";
import { LetterQuestion } from "./letterQuestionQueries";
import { Letter } from "./letterQueries";
import supabase from "~/libs/supabase";
import { day } from "~/lib/constants/sizes";

export type LetterLevel = Database["public"]["Tables"]["letter_levels"]["Row"] &
    Pick<LetterQuestion, "letter_questions_to_letter_levels"> & {
        letters_to_letter_levels: Array<{
            letter_id: string;
            letter_level_id: string;
        }>;
    };

export type LetterLevelData = LetterLevel & {
    letterQuestions: Array<LetterQuestion>;
    letters: Array<Letter>;
};

export const LETTER_LEVELS = "LETTER_LEVELS";

export const useGetLetterLevels = () => {
    const query = useQuery<Array<LetterLevel>, PostgrestError>({
        queryKey: [LETTER_LEVELS],

        queryFn: async () => {
            const response = await supabase.from("letter_levels").select(`
                created_at,
                deleted,
                id,
                letter_type_id,
                number,
                updated_at,
                letter_questions_to_letter_levels (
                    letter_question_id,
                    letter_level_id,
                    number
                ),
                letters_to_letter_levels (
                    letter_id,
                    letter_level_id
                )
            `);


            if (response.error) {
                throw response.error;
            }

            return response.data;
        },

        staleTime: day,
    });

    return query;
};
