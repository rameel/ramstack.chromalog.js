import { describe, expect, test } from "vitest";
import { highlight } from "@/highlight";
import { create_unix_path_highlighter } from "@/highlighters";

describe("path", () => {
    const highlighter = create_unix_path_highlighter(s => `[path: ${s}]`);

    test("highlights unix path ", () => {
        const values = [
            "/",
            "~/",
            "/usr",
            "usr/",
            "/usr/bin",
            "/usr/bin/",
            "usr/bin",
            "usr/../bin",
            "/usr/../bin",
            "~/Documents",
            "Documents/",
            "~/Documents/",
            ".dist/",
            "./dist",
            "./dist/index.js",
        ];

        for (let value of values) {
            expect(
                highlight(`(${value})`, [highlighter])
            ).toBe(`([path: ${value}])`);
        }
    });

    test("hi", () => {
        expect(
            highlight(`/usr/bin and /root`, [highlighter])
        ).toBe(`[path: /usr/bin] and [path: /root]`);
    });
});
