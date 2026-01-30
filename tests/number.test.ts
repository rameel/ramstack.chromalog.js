import { describe, expect, test } from "vitest";
import { highlight } from "@/highlight";
import { create_number_highlighter } from "@/highlighters";

describe("number", () => {
    test("highlights numbers ", () => {
        const highlighter = create_number_highlighter(s => `[number: ${s}]`);
        expect(
            highlight("(3.14159 + 10 = 13.14159)", [highlighter])
        ).toBe("([number: 3.14159] + [number: 10] = [number: 13.14159])");

        expect(
            highlight("3.14.159", [highlighter])
        ).toBe("[number: 3.14].[number: 159]");

        expect(
            highlight("elapsed=42ms timeout=3.5s", [highlighter])
        ).toBe("elapsed=[number: 42ms] timeout=[number: 3.5s]");

        expect(
            highlight("memory=512MB disk=2.3GB cpu=4763MHz", [highlighter])
        ).toBe("memory=[number: 512MB] disk=[number: 2.3GB] cpu=[number: 4763MHz]");

        expect(
            highlight("usage=99% error_rate=0.01%", [highlighter])
        ).toBe("usage=[number: 99%] error_rate=[number: 0.01%]");
    });
});
