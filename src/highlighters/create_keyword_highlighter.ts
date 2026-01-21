import pc from "picocolors";
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
                return pc.red(s);

            case "TRC":
            case "TRACE":
                return pc.gray(s);

            case "DBG":
            case "DEBUG":
                return pc.white(s);

            case "INF":
            case "INFO":
                return pc.cyan(s);

            case "WRN":
            case "WARN":
            case "WARNING":
                return pc.yellow(s);

            case "ERR":
            case "ERROR":
                return pc.red(s);

            case "FTL":
            case "FATAL":
                return pc.red(s);

            case "GET":
            case "HEAD":
                return pc.bgGreen(pc.black(` ${s} `));

            case "PUT":
            case "POST":
            case "PATCH":
                return pc.bgCyan(pc.black(` ${s} `));

            case "DELETE":
                return pc.bgRed(pc.black(` ${s} `));

            default:
                return s;
        }
    }
}
