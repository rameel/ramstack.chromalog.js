import { bgCyan, bgGreen, bgRed, black, cyan, gray, red, white, yellow } from "picocolors";
import type { Highlighter } from "@/types";

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
                return bgGreen(black(` ${s} `));

            case "PUT":
            case "POST":
            case "PATCH":
                return bgCyan(black(` ${s} `));

            case "DELETE":
                return bgRed(black(` ${s} `));

            default:
                return s;
        }
    }
}
