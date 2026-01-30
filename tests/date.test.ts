import { describe, expect, test } from "vitest";
import { highlight } from "@/highlight";
import { create_date_highlighter } from "@/highlighters";

describe("date", () => {
    test("highlights dates in YYYY-MM-DD and DD/MM/YYYY formats", () => {
        const highlighter = create_date_highlighter(s => `[date: ${s}]`);

        const values = [
            "1975/10/25",
            "1975/31/12",
            "1978-05-14",
            "1978-25-10",
            "2022/01/02",
            "2023-10-25",
            "24.12.2023",
            "24.12.2023",
            "02/11/2024",
            "03/07/1925",
            "12.08.1938",
            "03-10-1925",
        ];

        for (const value of values) {
            expect(
                highlight(`(${value})`, [highlighter])
            ).toBe(`([date: ${value}])`);
        }

        expect(
            highlight("Between 2020-05-20 and 20.05.2020", [highlighter])
        ).toBe("Between [date: 2020-05-20] and [date: 20.05.2020]");
    });

    test("does not match dates with inconsistent separators inside", () => {
        const highlighter = create_date_highlighter(s => `[date: ${s}]`);

        const values = [
            "20/02-1985",
            "15/04-2017",
            "2024-01/15",
            "31-12/1999",
            "01.01-2000",
            "28/02.2024",
            "1995-06/30",
            "12-03/2008",
            "07.11-2022",
        ];

        for (const date of values) {
            // plain
            expect(highlight(date, [highlighter])).toBe(date);

            expect(highlight(`(${date})`, [highlighter])).toBe(`(${date})`);
            expect(highlight(`start: ${date}`, [highlighter])).toBe(`start: ${date}`);
        }
    });
});
