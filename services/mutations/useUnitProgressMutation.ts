import { useMutation, UseMutationOptions, useQueryClient } from "@tanstack/react-query";
import supabase from "~/instances/supabase";
import { PostgrestError } from "@supabase/supabase-js";
import { UNIT_PROGRESS_KEY, UnitProgress } from "../queries/unitProgressQueries";

type Options = Partial<UseMutationOptions<Array<UnitProgress>, PostgrestError, Omit<UnitProgress, "status">>>;

const useUnitProgressMutation = (options?: Options) => {
  const isLogin = false;

  const queryClient = useQueryClient();

  const mutation = useMutation<Array<UnitProgress>, PostgrestError, Omit<UnitProgress, "status">>({
    mutationFn: async (payload) => {
      try {
        if (!isLogin) {
          throw new Error();
        }

        const res = await supabase.from("unit_progress").insert(payload).select("*");

        if (res.error) {
          throw res.error;
        }

        const resultData = new Map<string, UnitProgress>();

        const prevData = queryClient.getQueryData<Array<UnitProgress>>([UNIT_PROGRESS_KEY]) ?? [];

        const newData: Array<UnitProgress> = res.data.map((item) => ({ ...item, status: "saved" }));

        for (let index = 0; index < prevData.length; index++) {
          const element = prevData[index];

          resultData.set(element.id, element);
        }

        for (let index = 0; index < newData.length; index++) {
          const element = newData[index];

          resultData.set(element.id, element);
        }

        const nextData: Array<UnitProgress> = Array.from(resultData.values());

        queryClient.setQueryData<Array<UnitProgress>>([UNIT_PROGRESS_KEY], nextData);

        return newData;
      } catch (error) {
        const prevData = queryClient.getQueryData<Array<UnitProgress>>([UNIT_PROGRESS_KEY]) ?? [];

        const resultData = new Map<string, UnitProgress>();

        for (let index = 0; index < prevData.length; index++) {
          const element = prevData[index];

          resultData.set(element.id, element);
        }

        const newData: UnitProgress = { ...payload, status: "local" };

        resultData.set(payload.id, newData);

        queryClient.setQueryData<Array<UnitProgress>>([UNIT_PROGRESS_KEY], Array.from(resultData.values()));

        return [newData];
      }
    },
    ...(options ?? {}),
  });

  return mutation;
};

export default useUnitProgressMutation;
