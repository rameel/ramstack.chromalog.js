import pc from "picocolors";
import type { Highlighter } from "@/types";

export function create_datetime_iso_highlighter(apply?: (m: string) => string): Highlighter {
    return {
        regex: /\b\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:?\d{2})?\b/g,
        apply: apply ?? pc.magenta
    };
}
