import {describe, expect, test} from "vitest";
import {highlight} from "@/highlight";
import {create_number_highlighter} from "@/highlighters/create_number_highlighter";

describe("number", () => {
    test("highlights numbers ", () => {
        const highlighter = create_number_highlighter(s => `[number: ${s}]`);
        expect(
            highlight("(3.14159 + 10 = 13.14159)", [highlighter])
        ).toBe("([number: 3.14159] + [number: 10] = [number: 13.14159])");

        expect(
            highlight("3.14.159", [highlighter])
        ).toBe("[number: 3.14].[number: 159]");
    });
});
