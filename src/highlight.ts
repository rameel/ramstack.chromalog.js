import type { Highlighter } from "@/types";
import supports_color from "supports-color";
import {
    create_date_highlighter,
    create_datetime_iso_highlighter,
    create_guid_highlighter,
    create_ip4_highlighter,
    create_keyword_highlighter,
    create_number_highlighter,
    create_string_highlighter,
    create_time_highlighter,
    create_unix_path_highlighter,
    create_unix_process_highlighter,
    create_windows_path_highlighter
} from "@/highlighters";

const default_rules: Highlighter[] = [
    create_date_highlighter(),
    create_datetime_iso_highlighter(),
    create_guid_highlighter(),
    create_ip4_highlighter(),
    create_keyword_highlighter(),
    create_number_highlighter(),
    create_string_highlighter(),
    create_time_highlighter(),
    create_unix_path_highlighter(),
    create_unix_process_highlighter(),
    create_windows_path_highlighter()
];

/**
 * Applies highlighting rules to the specified string.
 *
 * If no rules are provided, a default set of built-in highlighters is used.
 *
 * @param value - The input string to highlight.
 * @param rules - Optional list of highlighter rules to apply.
 * @returns The highlighted string.
 */
export function highlight(value: string, rules?: Highlighter[]): string {
    if (!supports_color.stdout) {
        return value;
    }

    let matches: MatchResult[] = [];

    for (let rule of rules ?? default_rules) {
        gather_matches(value, rule, matches);
    }

    matches.sort((a, b) => {
        if (a.start !== b.start) return a.start - b.start;
        if (a.count !== b.count) return b.count - a.count;
        return a.order - b.order;
    });

    let pos = 0;
    let builder = [];

    for (let match of matches) {
        if (match.start < pos) {
            continue;
        }

        if (match.start > pos) {
            builder.push(value.slice(pos, match.start));
        }

        builder.push(match.apply());
        pos = match.start + match.count;
    }

    pos < value.length && builder.push(value.slice(pos));
    return builder.join("");
}

function gather_matches(str: string, highlighter: Highlighter, matches: MatchResult[]) {
    for (let match of str.matchAll(highlighter.regex)) {
        if (match[0].length > 0) {
            matches.push({
                order: highlighter.order ?? 0,
                start: match.index,
                count: match[0].length,
                value: match[0],
                style: highlighter,
                apply() {
                    return this.style.apply(this.value);
                }
            });
        }
    }
}

interface MatchResult {
    order: number;
    start: number;
    count: number;
    value: string;
    style: Highlighter;
    apply: () => string
}
