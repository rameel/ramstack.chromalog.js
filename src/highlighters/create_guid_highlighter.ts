import { blue } from "@/colors";
import type { Highlighter } from "@/types";

/**
 * Creates a highlighter for GUID/UUID values.
 *
 * @param apply - Optional custom transform function for a matched value.
 * @returns A configured GUID highlighter.
 */
export function create_guid_highlighter(apply?: (m: string) => string): Highlighter {
    return {
        regex: /\b[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}\b/g,
        apply: apply ?? blue
    };
}
