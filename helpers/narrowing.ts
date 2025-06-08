import type { PostgrestError } from "@supabase/supabase-js";
import { LetterProgressData } from "~/services/queries/letterProgressQueries";

export function isPostgrestError(error: Error): error is PostgrestError {
    if (typeof error !== "object") {
        return false;
    }

    return Boolean((error as { code?: string }).code);
}

export function isLetterProgressErrorSynced(data: LetterProgressData): data is Extract<LetterProgressData, { status: "error-synced" }> {
    return data.status === "error-synced";
}

export function isLetterProgressLocal(data: LetterProgressData): data is Extract<LetterProgressData, { status: "local" }> {
    return data.status === "local";
}

export function isLetterProgressSynced(data: LetterProgressData): data is Extract<LetterProgressData, { status: "synced" }> {
    return data.status === "synced";
}

export function isLetterProgressLocalOrErrorSynced(data: LetterProgressData): data is Extract<LetterProgressData, { status: "local" | "error-synced" }> {
    return isLetterProgressErrorSynced(data) || isLetterProgressLocal(data);
}
