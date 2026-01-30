import { cyan } from "@/colors";
import type { Highlighter } from "@/types";

/**
 * Creates a highlighter for date values.
 *
 * Matches dates in formats like:
 * - `YYYY[-./]MM[-./]DD`
 * - `DD[-./]MM[-./]YYYY`
 *
 * @param apply - Optional custom transform function for a matched value.
 * @returns A configured date highlighter.
 */
export function create_date_highlighter(apply?: (m: string) => string): Highlighter {
    return {
        //        [======YYYY/mm/dd======] [======dd/mm/YYYY======]
        regex: /\b\d{4}([/.-])\d{2}\1\d{2}|\d{2}([/.-])\d{2}\2\d{4}\b/g,
        apply: apply ?? (s => s.replace(/\d+/g, cyan))
    };
}
