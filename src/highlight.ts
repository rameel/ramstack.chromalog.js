import type { Highlighter } from "@/types";
import {
    create_date_highlighter,
    create_datetime_iso_highlighter,
    create_guid_highlighter,
    create_ip4_highlighter,
    create_keyword_highlighter,
    create_number_highlighter,
    create_string_highlighter,
    create_unix_path_highlighter,
    create_windows_path_highlighter,
} from "@/highlighters";

const default_rules: Highlighter[] = [
    create_date_highlighter(),
    create_datetime_iso_highlighter(),
    create_guid_highlighter(),
    create_ip4_highlighter(),
    create_keyword_highlighter(),
    create_number_highlighter(),
    create_string_highlighter(),
    create_unix_path_highlighter(),
    create_windows_path_highlighter(),
];

export function highlight(str: string, rules?: Highlighter[]): string {
    let matches: MatchResult[] = [];

    for (let rule of rules ?? default_rules) {
        gather_matches(str, rule, matches);
    }

    matches.sort((a, b) => {
        if (a.start !== b.start) {
            return a.start - b.start;
        }

        if (a.count !== b.count) {
            return b.count - a.count;
        }

        return 0;
    });

    let pos = 0;
    let builder = [];

    for (let match of matches) {
        if (match.start < pos) {
            continue;
        }

        if (match.start > pos) {
            builder.push(str.slice(pos, match.start));
        }

        builder.push(match.apply());
        pos = match.start + match.count;
    }

    pos < str.length && builder.push(str.slice(pos));
    return builder.join("");
}

function gather_matches(str: string, rule: Highlighter, matches: MatchResult[]) {
    for (let match of str.matchAll(rule.regex)) {
        if (match[0].length > 0) {
            const value = match[0];
            matches.push({
                start: match.index,
                count: match[0].length,
                apply: () => rule.apply(value)
            });
        }
    }
}

interface MatchResult {
    start: number;
    count: number;
    apply: () => string
}
