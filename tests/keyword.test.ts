import { describe, expect, test } from "vitest";
import { highlight } from "@/highlight";
import { create_keyword_highlighter } from "@/highlighters";

describe("keyword", () => {
    test("highlights keywords", () => {
        const highlighter = create_keyword_highlighter(s => `[kw: ${s}]`);
        const keywords = [
            "GET", "HEAD", "POST", "PUT", "PATCH", "DELETE",
            "TRC", "TRACE", "DBG", "DEBUG",
            "INF", "INFO", "WRN", "WARN", "WARNING",
            "ERR", "ERROR", "FTL", "FATAL",
            "true", "false", "null"
        ];

        for (let keyword of keywords) {
            expect(
                highlight(`(${keyword})-(${keyword})`, [highlighter])
            ).toBe(`([kw: ${keyword}])-([kw: ${keyword}])`);
        }
    });

    test("does not highlights non-keywords", () => {
        const highlighter = create_keyword_highlighter(s => `[kw: ${s}]`);
        const keywords = [
            "GET", "HEAD", "POST", "PUT", "PATCH", "DELETE",
            "TRC", "TRACE", "DBG", "DEBUG",
            "INF", "INFO", "WRN", "WARN", "WARNING",
            "ERR", "ERROR", "FTL", "FATAL",
            "true", "false", "null"
        ];

        for (let keyword of keywords) {
            expect(
                highlight(`A${keyword}-${keyword}B`, [highlighter])
            ).toBe(`A${keyword}-${keyword}B`);
        }
    });
});
