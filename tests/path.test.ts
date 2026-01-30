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
            "../usr",
            "~/usr/bin",
            "/usr/bin/",
            "../usr/bin",
            "~/usr/../bin",
            "/usr/../bin",
            "/Documents",
            "~/Documents/",
            "./dist/",
            "./dist",
            "../dist/index.js"
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
            "C:\\",
            "C:\\Programs Files\\",
            "C:\\Programs Files\\Terminal",
            "C:\\Programs Files\\Terminal App\\Terminal.exe",
            "Z:\\admin",
            "Z:\\admin\\Documents",
            "Z:\\admin\\Documents\\"
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
            highlight("/usr/bin and C:\\Users\\Admin", highlighters)
        ).toBe(`[unix: /usr/bin] and [windows: C:\\Users\\Admin]`);
    });
});
