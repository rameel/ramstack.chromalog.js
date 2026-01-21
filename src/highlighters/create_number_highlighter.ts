import { blue } from "@/colors";
import type { Highlighter } from "@/types";

/**
 * Creates a highlighter for numeric values.
 *
 * Matches integer numbers, floating-point numbers, and hexadecimal values.
 *
 * @param apply - Optional custom transform function for a matched value.
 * @returns A configured number highlighter.
 */
export function create_number_highlighter(apply?: (m: string) => string): Highlighter {
    return {
        regex: /\b(?:\d+(?:\.\d+)?|0x[0-9a-fA-F]+)\b/g,
        apply: apply ?? blue
    };
}
