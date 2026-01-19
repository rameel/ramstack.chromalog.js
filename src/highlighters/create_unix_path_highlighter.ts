import { green } from "picocolors";
import type { Highlighter } from "@/types";

export function create_unix_path_highlighter(apply?: (m: string) => string): Highlighter {
    return {
        order: 10,
        regex: /(?:\/|[\w~.-]+\/)+[\w~.-]*/g,
        apply: apply ?? green
    };
}
