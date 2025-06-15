import { useMutation, UseMutationOptions, useQueryClient } from "@tanstack/react-query";
import supabase from "~/libs/supabase";
import { LETTER_PROGRESS_KEY, LetterProgress } from "../queries/letterProgressQueries";
import { PostgrestError } from "@supabase/supabase-js";

type Options = Partial<UseMutationOptions<Array<LetterProgress>, PostgrestError, Omit<LetterProgress, "status">>>;

const useLetterProgressMutation = (options?: Options) => {
  const isLogin = false;

  const queryClient = useQueryClient();

  const mutation = useMutation<Array<LetterProgress>, PostgrestError, Omit<LetterProgress, "status">>({
    mutationFn: async (payload) => {
      try {
        if (!isLogin) {
          throw new Error();
        }

        const res = await supabase.from("letter_progress").insert(payload).select("*");

        if (res.error) {
          throw res.error;
        }

        const resultData = new Map<string, LetterProgress>();

        const prevData = queryClient.getQueryData<Array<LetterProgress>>([LETTER_PROGRESS_KEY]) ?? [];

        const newData: Array<LetterProgress> = res.data.map((item) => ({ ...item, status: "saved" }));

        for (let index = 0; index < prevData.length; index++) {
          const element = prevData[index];

          resultData.set(element.id, element);
        }

        for (let index = 0; index < newData.length; index++) {
          const element = newData[index];

          resultData.set(element.id, element);
        }

        const nextData: Array<LetterProgress> = Array.from(resultData.values());

        queryClient.setQueryData<Array<LetterProgress>>([LETTER_PROGRESS_KEY], nextData);

        return newData;
      } catch (error) {
        const prevData = queryClient.getQueryData<Array<LetterProgress>>([LETTER_PROGRESS_KEY]) ?? [];

        const resultData = new Map<string, LetterProgress>();

        for (let index = 0; index < prevData.length; index++) {
          const element = prevData[index];

          resultData.set(element.id, element);
        }

        const newData: LetterProgress = { ...payload, status: "local" };

        resultData.set(payload.id, newData);

        queryClient.setQueryData<Array<LetterProgress>>([LETTER_PROGRESS_KEY], Array.from(resultData.values()));

        return [newData];
      }
    },
    ...(options ?? {}),
  });

  return mutation;
};

export default useLetterProgressMutation;
