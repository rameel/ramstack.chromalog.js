import { expect, test } from "vitest";
import { highlight } from "@/highlight";
import { create_guid_highlighter } from "@/highlighters";

test("guid", () => {
    const highlighter = create_guid_highlighter(s => `[guid: ${s}]`);
    const result = highlight("(99bd2ccf-a665-4605-83d8-94f26ed52541)", [highlighter]);

    expect(result).toBe(`([guid: 99bd2ccf-a665-4605-83d8-94f26ed52541])`);
});
