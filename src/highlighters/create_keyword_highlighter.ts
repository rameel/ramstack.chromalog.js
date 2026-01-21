import { bg_cyan, bg_green, bg_red, black, cyan, gray, red, white, yellow } from "@/colors";
import type { Highlighter } from "@/types";

/**
 * Creates a highlighter for keywords.
 *
 * Matches values like:
 * - HTTP methods
 * - Log level names
 * - Boolean and null literals
 *
 * @param apply - Optional custom transform function for a matched value.
 * @returns A configured keyword highlighter.
 */
export function create_keyword_highlighter(apply?: (m: string) => string): Highlighter {
    return {
        regex: /\b(GET|HEAD|POST|PUT|PATCH|DELETE|TRC|TRACE|DBG|DEBUG|INFO?|WRN|WARN(?:ING)?|ERR|ERROR|FTL|FATAL|true|false|null)\b/g,
        apply: apply ?? default_apply
    };

    function default_apply(s: string): string {
        switch (s) {
            case "true":
            case "false":
            case "null":
                return red(s);

            case "TRC":
            case "TRACE":
                return gray(s);

            case "DBG":
            case "DEBUG":
                return white(s);

            case "INF":
            case "INFO":
                return cyan(s);

            case "WRN":
            case "WARN":
            case "WARNING":
                return yellow(s);

            case "ERR":
            case "ERROR":
                return red(s);

            case "FTL":
            case "FATAL":
                return red(s);

            case "GET":
            case "HEAD":
                return bg_green(black(` ${s} `));

            case "PUT":
            case "POST":
            case "PATCH":
                return bg_cyan(black(` ${s} `));

            case "DELETE":
                return bg_red(black(` ${s} `));

            default:
                return s;
        }
    }
}
