import { cyan } from "@/colors";
import type { Highlighter } from "@/types";

/**
 * Creates a highlighter for IPv4 addresses.
 *
 * Does not validate numeric ranges, only matches the general format.
 *
 * @param apply - Optional custom transform function for a matched value.
 * @returns A configured IPv4 highlighter.
 */
export function create_ip4_highlighter(apply?: (m: string) => string): Highlighter {
    return {
        regex: /\b(?<![\d.])\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(?:\/\d{1,2})?(?!\.\d)\b/g,
        apply: apply ?? cyan
    };
}
