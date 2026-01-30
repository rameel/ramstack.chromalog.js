import { cyan, gray, red, white, yellow } from "@/colors";
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
            case "FTL":
            case "FATAL":
                return red(s);

            case "GET":
            case "HEAD":
                // black on green
                return "\x1b[42;30m " + s + " \x1b[0m";

            case "PUT":
            case "POST":
            case "PATCH":
                // black on cyan
                return "\x1b[46;30m " + s + " \x1b[0m";

            case "DELETE":
                // black on red
                return "\x1b[41;30m " + s + " \x1b[0m";

            default:
                return s;
        }
    }
}
