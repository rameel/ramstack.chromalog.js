import { describe, expect, test } from "vitest";
import { highlight } from "@/highlight";
import {
    create_unix_path_highlighter,
    create_windows_path_highlighter
} from "@/highlighters";

describe("path", () => {

    test("highlights unix path ", () => {
        const highlighter = create_unix_path_highlighter(s => `[path: ${s}]`);
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
            "./dist/index.js"
        ];

        for (let value of values) {
            expect(
                highlight(`(${value})`, [highlighter])
            ).toBe(`([path: ${value}])`);
        }
    });

    test("highlights windows path ", () => {
        const highlighter = create_windows_path_highlighter(s => `[path: ${s}]`);
        const values = [
            "C:\\Users\\admin\\Documents",
            "d:\\Users\\admin\\Documents",
            "admin\\",
            "admin\\Documents",
            "admin\\Documents\\"
        ];

        for (let value of values) {
            expect(
                highlight(`(${value})`, [highlighter])
            ).toBe(`([path: ${value}])`);
        }
    });

    test("highlights paths", () => {
        const highlighters = [
            create_unix_path_highlighter(s => `[unix: ${s}]`),
            create_windows_path_highlighter(s => `[windows: ${s}]`)
        ];
        expect(
            highlight("/usr/bin and user\\admin", highlighters)
        ).toBe(`[unix: /usr/bin] and [windows: user\\admin]`);
    });
});
