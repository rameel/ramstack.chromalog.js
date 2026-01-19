import { yellow } from "picocolors";
import type { Highlighter } from "@/types";

export function create_unix_process_highlighter(apply?: (m: string) => string): Highlighter {
    return {
        regex: /(?:\([A-Za-z0-9._ +:\/-]+\)|[A-Za-z0-9._\/-]+)(?=\[\d+])/g,
        apply: apply ?? yellow
    };
}
