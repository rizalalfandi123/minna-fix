import { useMutation, UseMutationOptions, useQueryClient } from "@tanstack/react-query";
import { getLetterProgressQueryOptions, LetterProgressData } from "../queries/letterProgressQueries";
import { Optional } from "~/types";
import { isLetterProgressErrorSynced, isLetterProgressLocal, isPostgrestError } from "~/helpers/narrowing";
import { v4 as uuid } from "uuid";
import supabase from "~/libs/supabase";

export type CreateLettterProgressOptions = Optional<UseMutationOptions<LetterProgressData, Error, LetterProgressData, Optional<Array<LetterProgressData>>>>;

export const useMutationLetterProgress = (options?: CreateLettterProgressOptions) => {
    const queryClient = useQueryClient();

    const mutation = useMutation<LetterProgressData, Error, LetterProgressData, Optional<Array<LetterProgressData>>>({
        mutationFn: async (newProgress) => {
            if (isLetterProgressLocal(newProgress)) {
                const { letter_levels, ...progressData } = newProgress.progress;

                const queries = {
                    create: () => {
                        return supabase.from("letter_progress").insert(progressData).select("*");
                    },

                    edit: () => {
                        const { id, ...updateData } = progressData;

                        return supabase.from("letter_progress").update(updateData).eq("id", id).select("*");
                    },

                    delete: () => supabase.from("letter_progress").delete().eq("id", progressData.id).select("*"),
                };

                const queryFn = queries[newProgress.operation];

                const response = await queryFn();

                if (response.error || !response.data[0]) {
                    throw response.error;
                }

                const syncedProgress: Extract<LetterProgressData, { status: "synced" }> = {
                    progress: {
                        ...response.data[0],
                        letter_levels,
                    },
                    status: "synced",
                    id: newProgress.id,
                };

                return syncedProgress;
            }

            if (isLetterProgressErrorSynced(newProgress)) {
                throw new Error();
            }

            return newProgress;
        },

        onMutate: async (newProgress) => {
            await queryClient.cancelQueries(getLetterProgressQueryOptions);

            const previousLetterProgress = queryClient.getQueryData(getLetterProgressQueryOptions.queryKey) ?? [];

            const newQueryData = new Map(previousLetterProgress.map((item) => [item.id, item]));

            if (isLetterProgressErrorSynced(newProgress)) {
                newQueryData.delete(newProgress.id);
            } else {
                newQueryData.set(newProgress.id, newProgress);
            }

            queryClient.setQueryData(getLetterProgressQueryOptions.queryKey, Array.from(newQueryData.values()));

            return previousLetterProgress;
        },

        onError: (err, variables) => {
            if (!isPostgrestError(err)) {
                return;
            }

            const previousLetterProgress = queryClient.getQueryData(getLetterProgressQueryOptions.queryKey) ?? [];

            if (err.code !== "42501") {
                const nextLetterProgress: Array<LetterProgressData> = previousLetterProgress.map((item) => {
                    if (item.id === variables.id) {
                        const errorProgress: LetterProgressData = {
                            status: "error-synced",
                            progress: variables.progress,
                            id: item.id,
                        };

                        return errorProgress;
                    }

                    return item;
                });

                queryClient.setQueryData<Array<LetterProgressData>>(getLetterProgressQueryOptions.queryKey, nextLetterProgress);
            }
        },

        onSuccess(data) {
            const previousLetterProgress = queryClient.getQueryData(getLetterProgressQueryOptions.queryKey);

            if (previousLetterProgress) {
                const nextLetterProgress: Array<LetterProgressData> = previousLetterProgress.map((item) => {
                    if (item.id === data.id) {
                        const syncedProgress: Extract<LetterProgressData, { status: "synced" }> = {
                            progress: item.progress,
                            status: "synced",
                            id: uuid(),
                        };

                        return syncedProgress;
                    }

                    return item;
                });

                queryClient.setQueryData<Array<LetterProgressData>>(getLetterProgressQueryOptions.queryKey, nextLetterProgress);
            }
        },

        ...(options ?? {}),
    });

    return mutation;
};
