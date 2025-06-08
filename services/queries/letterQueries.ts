import { Database } from "~/database.types";
import { TLetterTypeName } from "~/types";
import { PostgrestError } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";
import { day } from "~/lib/constants/sizes";
import supabase from "~/libs/supabase";

export type Letter = Database["public"]["Tables"]["letters"]["Row"];

export type LetterType = Omit<Database["public"]["Tables"]["letter_types"]["Row"], "name"> & {
    name: TLetterTypeName;
};

export type LetterPosition = Database["public"]["Tables"]["letter_positions"]["Row"];

export type LetterBlock = Database["public"]["Tables"]["letter_blocks"]["Row"];

export type LetterData = {
    letters: Array<Letter>;
    letterPositions: Array<LetterPosition>;
    letterBlocks: Array<LetterBlock>;
    letterTypes: Array<LetterType>;
};

const LETTER_QUERY_KEY = "LETTERS";

export const useGetLetters = () => {
    const query = useQuery<LetterData, PostgrestError>({
        queryKey: [LETTER_QUERY_KEY],

        queryFn: async () => {
            const letters = await supabase.from("letters").select();

            const letterPositions = await supabase.from("letter_positions").select();

            const letterBlocks = await supabase.from("letter_blocks").select();

            const letterTypes = await supabase.from("letter_types").select().overrideTypes<Array<{ name: TLetterTypeName }>>();

            if (letters.error) {
                throw letters.error;
            }

            if (letterPositions.error) {
                throw letterPositions.error;
            }

            if (letterBlocks.error) {
                throw letterBlocks.error;
            }

            if (letterTypes.error) {
                throw letterTypes.error;
            }

            const data: LetterData = {
                letterBlocks: letterBlocks.data,
                letterPositions: letterPositions.data,
                letters: letters.data,
                letterTypes: letterTypes.data,
            };

            return data;
        },

        staleTime: 5 * day,
    });

    return query;
};
