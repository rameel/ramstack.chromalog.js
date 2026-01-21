import { yellow } from "@/colors";
import type { Highlighter } from "@/types";

/**
 * Creates a highlighter for Unix process identifiers.
 *
 * @param apply - Optional custom transform function for a matched value.
 * @returns A configured Unix process highlighter.
 */
export function create_unix_process_highlighter(apply?: (m: string) => string): Highlighter {
    return {
        regex: /(?:\([A-Za-z0-9._ +:\/-]+\)|[A-Za-z0-9._\/-]+)(?=\[\d+])/g,
        apply: apply ?? yellow
    };
}
