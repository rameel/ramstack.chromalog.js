import { describe, expect, test } from "vitest";
import { highlight } from "@/highlight";
import { create_string_highlighter } from "@/highlighters";

describe("string", () => {
    test("highlights single-quoted string ", () => {
        const highlighter = create_string_highlighter(s => `[string: ${s}]`);
        expect(
            highlight(`Print 'Hello' and continue`, [highlighter])
        ).toBe(`Print [string: 'Hello'] and continue`);
    });

    test("highlights double-quoted string ", () => {
        const highlighter = create_string_highlighter(s => `[string: ${s}]`);
        expect(
            highlight(`Print "Hello" and continue`, [highlighter])
        ).toBe(`Print [string: "Hello"] and continue`);
    });
});
