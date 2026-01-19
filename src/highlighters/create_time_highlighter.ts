import { magenta } from "picocolors";
import type { Highlighter } from "@/types";

export function create_time_highlighter(apply?: (m: string) => string): Highlighter {
    return {
        regex: /\b(?:[01]\d|2[0-3])(?::[0-5]\d){2}([.,:]\d+)?\b/g,
        apply: apply ?? magenta
    };
}
