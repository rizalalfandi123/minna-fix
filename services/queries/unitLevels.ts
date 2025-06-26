import { PostgrestError } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";
import supabase from "~/libs/supabase";
import { UnitLevel } from "~/types";

export const UNIT_LEVELS_KEY = "UNIT_LEVELS";

export const useGetDetailUnitLevels = (unitId: string) => {
  const query = useQuery<Array<UnitLevel>, PostgrestError>({
    queryKey: [UNIT_LEVELS_KEY, { unitId }],
    queryFn: async () => {
      const res = await supabase.from("unit_levels").select("*").eq("unit_id", unitId).order("number", { ascending: true });

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
