import { PostgrestError } from "@supabase/supabase-js";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import supabase from "~/libs/supabase";
import { Unit } from "~/types";

export type GetUnitOptions = Partial<UseQueryOptions<Array<Unit>, PostgrestError>>;

export const UNITS = "UNITS";

export const useGetUnits = (options?: GetUnitOptions) => {
  const query = useQuery<Array<Unit>, PostgrestError>({
    queryKey: [UNITS],

    queryFn: async () => {
      const units = await supabase.from("units").select("*");

      if (units.error) {
        throw units.error;
      }

      return units.data;
    },


    ...(options ?? {}),
  });

  return query;
};
