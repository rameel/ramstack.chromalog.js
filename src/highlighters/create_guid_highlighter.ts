import pc from "picocolors";
import type { Highlighter } from "@/types";

export function create_guid_highlighter(apply?: (m: string) => string): Highlighter {
    return {
        regex: /\b[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}\b/g,
        apply: apply ?? pc.blue
    };
}
