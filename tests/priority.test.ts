import { expect, test } from "vitest";
import { highlight } from "@/highlight";
import type { Highlighter } from "@/types";

const h1: Highlighter = {
    regex: /_abc_/g,
    order: 0,
    apply: s => `[h1: ${s}]`
};

const h2: Highlighter = {
    regex: /_[a-z]{3}_/g,
    order: 5,
    apply: s => `[h2: ${s}]`
};

test("highlighter priorities (order)", () => {
    expect(
        highlight("_abc_", [h1, h2])
    ).toBe("[h1: _abc_]");

    h1.order = 5;
    h2.order = 0;

    expect(
        highlight("_abc_", [h1, h2])
    ).toBe("[h2: _abc_]");
});
