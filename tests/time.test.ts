import { describe, expect, test } from "vitest";
import { highlight } from "@/highlight";
import { create_time_highlighter } from "@/highlighters";

describe("time", () => {
    test("highlights time in HH:mm:ss format with optional fractional seconds", () => {
        const highlighter = create_time_highlighter(s => `[time: ${s}]`);

        const values = [
            "14:30:00",
            "09:15:05",
            "23:59:59",
            "01:02:03",
            "12:00:00.123",
            "12:00:00,456",
            "12:00:00:999"
        ];

        for (let value of values) {
            expect(
                highlight(`(${value})`, [highlighter])
            ).toBe(`([time: ${value}])`);
        }
    });

    test("does not highlight invalid time strings", () => {
        const highlighter = create_time_highlighter(s => `[time: ${s}]`);

        const invalid = [
            "24:00:00",
            "12:60:00",
            "12:00:60",
            "12:0:00",
            "1:10:00"
        ];

        for (let value of invalid) {
            expect(highlight(value, [highlighter])).toBe(value);
        }
    });
});
