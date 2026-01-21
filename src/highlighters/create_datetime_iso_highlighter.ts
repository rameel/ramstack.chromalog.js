import pc from "picocolors";
import type { Highlighter } from "@/types";

/**
 * Creates a highlighter for ISO 8601 date-time strings.
 *
 * Matches values like:
 * - `2024-01-31T12:45:00Z`
 * - `2024-01-31T12:45:00+03:00`
 *
 * @param apply - Optional custom transform function for a matched value.
 * @returns A configured ISO date-time highlighter.
 */
export function create_datetime_iso_highlighter(apply?: (m: string) => string): Highlighter {
    return {
        regex: /\b\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:?\d{2})?\b/g,
        apply: apply ?? pc.magenta
    };
}
