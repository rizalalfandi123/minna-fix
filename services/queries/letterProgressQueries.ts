import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Database } from "~/database.types";
import supabase from "~/instances/supabase";

export const LETTER_PROGRESS_KEY = "LETTER_PROGRESS";

export type LetterProgress = Database["public"]["Tables"]["letter_progress"]["Row"] & {
  status: "local" | "saved";
};

const useLetterProgress = () => {
  const queryClient = useQueryClient();

  const query = useQuery<Array<LetterProgress>>({
    queryKey: [LETTER_PROGRESS_KEY],
    queryFn: async () => {
      const response = await supabase.from("letter_progress").select("*");

      const prevData = queryClient.getQueryData<Array<LetterProgress>>([LETTER_PROGRESS_KEY]) ?? [];

      const resultData = new Map<string, LetterProgress>();

      for (let index = 0; index < prevData.length; index++) {
        const element = prevData[index];

        resultData.set(element.id, element);
      }

      const newData = response.data ?? [];

      for (let index = 0; index < newData.length; index++) {
        const element = newData[index];

        resultData.set(element.id, { ...element, status: "saved" });
      }

      const result: Array<LetterProgress> = Array.from(resultData.values());

      return result;
    },
  });

  return query;
};

export default useLetterProgress;
