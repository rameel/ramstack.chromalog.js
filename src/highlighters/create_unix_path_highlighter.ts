import { green } from "picocolors";
import type { Highlighter } from "@/types";

export function create_unix_path_highlighter(apply?: (m: string) => string): Highlighter {
    return {
        regex: /(?:\/|[\w~.-]+\/)+[\w~.-]*/g,
        apply: apply ?? green
    };
}
