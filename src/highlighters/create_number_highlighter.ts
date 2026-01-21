import pc from "picocolors";
import type { Highlighter } from "@/types";

export function create_number_highlighter(apply?: (m: string) => string): Highlighter {
    return {
        regex: /\b(?:\d+(?:\.\d+)?|0x[0-9a-fA-F]+)\b/g,
        apply: apply ?? pc.blue
    };
}
