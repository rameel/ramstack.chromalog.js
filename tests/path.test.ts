import { describe, expect, test } from "vitest";
import { highlight } from "@/highlight";
import { create_unix_path_highlighter } from "@/highlighters";

describe("path", () => {
    test("highlights unix path ", () => {
        const highlighter = create_unix_path_highlighter(s => `[path: ${s}]`);
        const values = [
            "/usr/bin",
            "usr/bin",
            "usr/../bin",
            "/usr/../bin",
            "~/Documents",
            "Documents/",
            "~/Documents/",
            "./dist/index.js",
        ];

        for (let value of values) {
            expect(
                highlight(`(${value})`, [highlighter])
            ).toBe(`([path: ${value}])`);
        }
    });
});
