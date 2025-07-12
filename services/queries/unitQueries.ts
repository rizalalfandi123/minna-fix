import { PostgrestError } from "@supabase/supabase-js";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import supabase from "~/instances/supabase";
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

export type GetDetailUnitOptions = Partial<UseQueryOptions<Unit, PostgrestError>>;

export const useGetDetailUnit = (id: string, options?: GetDetailUnitOptions) => {
  const query = useQuery<Unit, PostgrestError>({
    queryKey: [UNITS, { id }],

    queryFn: async () => {
      const units = await supabase.from("units").select("*").eq("id", id).single();

      if (units.error) {
        throw units.error;
      }

      return units.data;
    },

    ...(options ?? {}),
  });

  return query;
};
