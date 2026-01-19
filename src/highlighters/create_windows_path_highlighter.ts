import { green } from "picocolors";
import type { Highlighter } from "@/types";

export function create_windows_path_highlighter(apply?: (m: string) => string): Highlighter {
    return {
        regex: /(?:[a-zA-Z]:\\(?:[\w ~.-]+\\)+|(?:[\w~.-]+\\)+)[\w~.-]*/g,
        apply: apply ?? green
    };
}
