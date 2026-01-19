import { describe, expect, test } from "vitest";
import { highlight } from "@/highlight";
import { create_guid_highlighter } from "@/highlighters";

describe("guid", () => {
    test("highlights GUID", () => {
        const highlighter = create_guid_highlighter(s => `[guid: ${s}]`);

        expect(
            highlight("(99bd2ccf-a665-4605-83d8-94f26ed52541)", [highlighter])
        ).toBe("([guid: 99bd2ccf-a665-4605-83d8-94f26ed52541])");

        expect(
            highlight("(99BD2CCF-A665-4605-83D8-94F26ED52541)", [highlighter])
        ).toBe("([guid: 99BD2CCF-A665-4605-83D8-94F26ED52541])");

        expect(
            highlight("id1: 99bd2ccf-a665-4605-83d8-94f26ed52541, id2: 550e8400-e29b-41d4-a716-446655440000", [highlighter])
        ).toBe("id1: [guid: 99bd2ccf-a665-4605-83d8-94f26ed52541], id2: [guid: 550e8400-e29b-41d4-a716-446655440000]");
    });

    test("does not highlight non-GUID", () => {
        const highlighter = create_guid_highlighter(s => `[guid: ${s}]`);
        const values = [
            "99bd2ccfa665460583d894f26ed52541",
            "99bd2ccf-a665-4605-83d8-94f26ed525411",
            "99bd2ccf-a665-4605-83d8-94f26ed5254",
            "99bd2ccf-a665-4605-83d8-94f26ed5254g",
            "99bd2ccf_a665_4605_83d8_94f26ed52541",
            "99bd2ccf-a66-54605-83d8-94f26ed52541",
            "99bd2-ccf-a665-4605-83d8-94f26ed52541",
            "Just some text"
        ];

        for (let value of values) {
            expect(
                highlight(value, [highlighter])
            ).toBe(value);
        }
    });
});
