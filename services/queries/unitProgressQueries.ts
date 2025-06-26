import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Database } from "~/database.types";
import supabase from "~/libs/supabase";

export const UNIT_PROGRESS_KEY = "UNIT_PROGRESS";

export type UnitProgress = Database["public"]["Tables"]["unit_progress"]["Row"] & {
  status: "local" | "saved";
};

const useUnitProgress = () => {
  const queryClient = useQueryClient();

  const query = useQuery<Array<UnitProgress>>({
    queryKey: [UNIT_PROGRESS_KEY],
    queryFn: async () => {
      const response = await supabase.from("unit_progress").select("*");

      const prevData = queryClient.getQueryData<Array<UnitProgress>>([UNIT_PROGRESS_KEY]) ?? [];

      const resultData = new Map<string, UnitProgress>();

      for (let index = 0; index < prevData.length; index++) {
        const element = prevData[index];

        resultData.set(element.id, element);
      }

      const newData = response.data ?? [];

      for (let index = 0; index < newData.length; index++) {
        const element = newData[index];

        resultData.set(element.id, { ...element, status: "saved" });
      }

      const result: Array<UnitProgress> = Array.from(resultData.values());

      return result;
    },
  });

  return query;
};

export default useUnitProgress;
