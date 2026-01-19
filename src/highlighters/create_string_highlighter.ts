import { yellowBright } from "picocolors";
import type { Highlighter } from "@/types";

export function create_string_highlighter(apply?: (m: string) => string): Highlighter {
    return {
        regex: /"[^"]*"|'[^']*'/g,
        apply: apply ?? yellowBright
    };
}
