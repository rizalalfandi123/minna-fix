import { PostgrestError } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";
import { Database, Json } from "~/database.types";
import supabase from "~/libs/supabase";

export const UNIT_LEVELS_KEY = "UNIT_LEVELS";

export type UnitLevel = Database["public"]["Tables"]["unit_levels"]["Row"];

export type UnitBlockType = Database['public']['Tables']['unit_question_blocks']['Row']['type']

export type DetailUnitBlock = {
  number: number;
  description: Json;
  id: string;
  unit_levels: {
    number: number;
    id: string;
  }[];
};

export const useGetDetailUnitBlocks = (unitId: string, type: UnitBlockType = 'vocabulary') => {
  const query = useQuery<Array<DetailUnitBlock>, PostgrestError>({
    queryKey: [UNIT_LEVELS_KEY, { unitId, type }],
    queryFn: async () => {
      const res = await supabase
        .from("unit_question_blocks")
        .select(
          `
          number,
          description,
          id,
          unit_levels (
            number,
            id
          )
        `
        )
        .eq("unit_id", unitId)
        .eq("type", type)
        .order("number", { ascending: true })
        .order("number", { ascending: true, referencedTable: "unit_levels" })
        .overrideTypes<Array<DetailUnitBlock>>();

      if (res.error) {
        throw res.error;
      }

      return res.data;
    },
  });

  return query;
};

export const useGetUnitLevels = () => {
  const query = useQuery({
    queryKey: [UNIT_LEVELS_KEY],
    queryFn: async () => {
      const res = await supabase.from("unit_levels").select("*");

      if (res.error) {
        throw res.error;
      }

      return res.data;
    },
  });

  return query;
};
