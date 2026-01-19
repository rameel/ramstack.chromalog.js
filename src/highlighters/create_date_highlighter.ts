import { red } from "picocolors";
import type { Highlighter } from "@/types";

export function create_date_highlighter(apply?: (m: string) => string): Highlighter {
    return {
        //        [=====================YYYY/mm/dd====================] [================================dd/mm/YYYY===============================]
        regex: /\b(?:19\d{2}|20\d{2})(?:[/-](?:0[1-9]|[12]\d|3[01])){2}|(?:0[1-9]|[12]\d|3[01])[/.-](?:0[1-9]|[12]\d|3[01])[/.-](?:19\d{2}|20\d{2})\b/g,
        apply: apply ?? (s => s.replace(/\d+/g, red))
    };
}
