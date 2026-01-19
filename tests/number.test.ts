import { expect, test } from "vitest";
import { highlight } from "@/highlight";
import { create_number_highlighter } from "@/highlighters/create_number_highlighter";

test("number", () => {
    const highlighter = create_number_highlighter(s => `[number: ${s}]`);
    const result = highlight("(3.14159 + 10 = 13.14159)", [highlighter]);

    expect(result).toBe(`([number: 3.14159] + [number: 10] = [number: 13.14159])`);
});
