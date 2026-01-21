import pc from "picocolors";
import type { Highlighter } from "@/types";

export function create_ip4_highlighter(apply?: (m: string) => string): Highlighter {
    return {
        regex: /\b(?<![\d.])\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(?:\/\d{1,2})?(?!\.\d)\b/g,
        apply: apply ?? pc.cyan
    };
}
