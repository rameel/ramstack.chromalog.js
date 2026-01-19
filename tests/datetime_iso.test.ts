import { describe, expect, test } from "vitest";
import { highlight } from "@/highlight";
import { create_datetime_iso_highlighter } from "@/highlighters";

describe("datetime_iso", () => {
    test("highlights various ISO datetime formats", () => {
        const highlighter = create_datetime_iso_highlighter(s => `[iso: ${s}]`);

        expect(
            highlight("Event at 2023-10-25T14:30:00Z occurred", [highlighter])
        ).toBe("Event at [iso: 2023-10-25T14:30:00Z] occurred");

        expect(
            highlight("Started 2024-01-01T12:00:00.123", [highlighter])
        ).toBe("Started [iso: 2024-01-01T12:00:00.123]");

        expect(
            highlight("Local time: 2023-05-15T10:00:00+03:00.", [highlighter])
        ).toBe("Local time: [iso: 2023-05-15T10:00:00+03:00].");
    });

    test("highlights multiple dates in one string", () => {
        const highlighter = create_datetime_iso_highlighter(s => `[iso: ${s}]`);
        const input = "From 2022-01-01T00:00:00Z to 2022-12-31T23:59:59Z";

        expect(highlight(input, [highlighter])).toBe(
            "From [iso: 2022-01-01T00:00:00Z] to [iso: 2022-12-31T23:59:59Z]"
        );
    });
});
