import { magenta } from "@/colors";
import type { Highlighter } from "@/types";

/**
 * Creates a highlighter for time values.
 *
 * @param apply - Optional custom transform function for a matched value.
 * @returns A configured time highlighter.
 */
export function create_time_highlighter(apply?: (m: string) => string): Highlighter {
    return {
        regex: /\b(?:[01]\d|2[0-3])(?::[0-5]\d){2}([.,:]\d+)?\b/g,
        apply: apply ?? magenta
    };
}
