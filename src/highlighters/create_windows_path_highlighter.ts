import { green } from "@/colors";
import type { Highlighter } from "@/types";

/**
 * Creates a highlighter for Windows-style file system paths.
 *
 * Uses a lower priority to reduce conflicts with other highlighters.
 *
 * @param apply - Optional custom transform function for a matched value.
 * @returns A configured path highlighter.
 */
export function create_windows_path_highlighter(apply?: (m: string) => string): Highlighter {
    return {
        order: 10,
        regex: /(?:[a-zA-Z]:\\(?:[\w ~.-]+\\)+|(?:[\w~.-]+\\)+)[\w~.-]*/g,
        apply: apply ?? green
    };
}
