import pc from "picocolors";
import type { Highlighter } from "@/types";

export function create_windows_path_highlighter(apply?: (m: string) => string): Highlighter {
    return {
        order: 10,
        regex: /(?:[a-zA-Z]:\\(?:[\w ~.-]+\\)+|(?:[\w~.-]+\\)+)[\w~.-]*/g,
        apply: apply ?? pc.green
    };
}
