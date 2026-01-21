import { yellow_bright } from "@/colors";
import type { Highlighter } from "@/types";

/**
 * Creates a highlighter for string literals.
 *
 * Matches both single-quoted and double-quoted strings.
 *
 * @param apply - Optional custom transform function for a matched value.
 * @returns A configured string highlighter.
 */
export function create_string_highlighter(apply?: (m: string) => string): Highlighter {
    return {
        regex: /"[^"]*"|'[^']*'/g,
        apply: apply ?? yellow_bright
    };
}
